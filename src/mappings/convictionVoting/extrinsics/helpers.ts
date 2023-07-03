import { BatchContext, SubstrateBlock } from "@subsquid/substrate-processor"
import { Store } from "@subsquid/typeorm-store"
import { IsNull } from "typeorm"
import { ConvictionVotingDelegation, OpenGovReferendum, StandardVoteBalance, ConvictionVote, VoteType, VoteDecisionOpenGov, SplitVoteBalance, SplitAbstainVoteBalance } from "../../../model"
import { currentValidators, setValidators } from "../../session/events/newSession"
import { NoOpenVoteFound, TooManyOpenVotes } from "./errors"
import { getVotesCount } from "./vote"

export function convictionToLockPeriod(convictionKind: string): number {
    return convictionKind === 'None' ? 0 : Number(convictionKind[convictionKind.search(/\d/)])
}

export async function removeDelegatedVotesOngoingReferenda(ctx: BatchContext<Store, unknown>, wallet: string | undefined, block: number, blockTime: number, track: number): Promise<void> {
    //get any ongoing referenda in this track
    const ongoingReferenda = await ctx.store.find(OpenGovReferendum, { where: { endedAt: IsNull(), track } })
    let delegations = await getDelegations(ctx, wallet, track)
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const ongoingReferendum = ongoingReferenda[i]
        await removeDelegatedVotesReferendum(ctx, block, blockTime, ongoingReferendum.index, delegations)
    }
}

export async function removeDelegatedVotesReferendum(ctx: BatchContext<Store, unknown>, block: number, blockTime: number, index: number, nestedDelegations: ConvictionVotingDelegation[]): Promise<void> {
    for (let i = 0; i < nestedDelegations.length; i++) {
        //remove active votes
        const delegation = nestedDelegations[i]
        const votes = await ctx.store.find(ConvictionVote, { where: { voter: delegation.wallet, delegatedTo: delegation.to, referendumIndex: index, blockNumberRemoved: IsNull(), type: VoteType.Delegated } })
        if (votes.length > 1) {
            //should never happen
            ctx.log.warn(TooManyOpenVotes(block, index, delegation.wallet))
            return
        }
        else if (votes.length === 0) {
            // no votes for ongoing referenda
            // ctx.log.warn(NoOpenVoteFound(header.height, ongoingReferendum.index, to))
            return
        }
        const vote = votes[0]
        vote.blockNumberRemoved = block
        vote.timestampRemoved = new Date(blockTime)
        await ctx.store.save(vote)
    }
}

export async function removeVote(ctx: BatchContext<Store, unknown>, wallet: string | undefined, referendumIndex: number, block: number, blockTime: number, shouldHaveVote: boolean, type?: VoteType, delegatedTo?: string): Promise<void> {
    const votes = await ctx.store.find(ConvictionVote, { where: { voter: wallet, referendumIndex, blockNumberRemoved: IsNull(), type, delegatedTo } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(block, referendumIndex, wallet))
        return
    }
    else if (votes.length === 0 && shouldHaveVote) {
        ctx.log.warn(NoOpenVoteFound(block, referendumIndex, wallet))
        return
    }
    else if (votes.length === 0 && !shouldHaveVote) {
        return
    }
    const vote = votes[0]
    vote.blockNumberRemoved = block
    vote.timestampRemoved = new Date(blockTime)
    await ctx.store.save(vote)
}

export async function addOngoingReferendaDelegatedVotes(ctx: BatchContext<Store, unknown>, toWallet: string | undefined, header: SubstrateBlock, track: number): Promise<void> {
    const ongoingReferenda = await ctx.store.find(OpenGovReferendum, { where: { endedAt: IsNull(), track } })
    const delegations = await getDelegations(ctx, toWallet, track)
    const validators = currentValidators || setValidators(ctx, header)
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const ongoingReferendum = ongoingReferenda[i]
        await addDelegatedVotesReferendum(ctx, toWallet, header.height, header.timestamp, ongoingReferendum, delegations, validators, track)
    }
}

export async function addDelegatedVotesReferendum(ctx: BatchContext<Store, unknown>, toWallet: string | undefined, block: number, blockTime: number, referendum: OpenGovReferendum, delegations: ConvictionVotingDelegation[], validators: string[], track: number): Promise<void> {
    //get top toWallet vote
    const votes = await ctx.store.find(ConvictionVote, { where: { voter: toWallet, referendumIndex: referendum.index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(block, referendum.index, toWallet))
        return
    }
    else if (votes.length === 0) {
        //to wallet didn't vote yet
        // ctx.log.warn(NoOpenVoteFound(header.height, ongoingReferendum.index, toAddress))
        return
    }
    const vote = votes[0]
    for (let i = 0; i < delegations.length; i++) {
        //add votes
        const delegation = delegations[i]
        const count = await getVotesCount(ctx, referendum.id)
        let voteBalance
        switch (true) {
            case vote.balance instanceof StandardVoteBalance:
                voteBalance = new StandardVoteBalance({
                    value: delegation.balance
                });
                break;
            case vote.balance instanceof SplitVoteBalance:
                if ('aye' in vote.balance && 'nay' in vote.balance) { // type guard
                    let aye, nay
                    if (vote.balance.aye + vote.balance.nay === 0n) {
                        aye = 0n
                        nay = 0n
                    } else {
                        aye =
                            delegation.balance *
                            (vote.balance.aye /
                                (vote.balance.aye + vote.balance.nay))
                        nay =
                            delegation.balance *
                            (vote.balance.nay /
                                (vote.balance.aye + vote.balance.nay))
                    }

                    voteBalance = new SplitVoteBalance({
                        aye,
                        nay
                    });
                }
                break;
            case vote.balance instanceof SplitAbstainVoteBalance:
                if ('aye' in vote.balance && 'nay' in vote.balance && 'abstain' in vote.balance) { // type guard
                    let ayePercentage, nayPercentage, abstainPercentage
                    if (vote.balance.aye + vote.balance.nay + vote.balance.abstain === 0n) {
                        ayePercentage = 0n
                        nayPercentage = 0n
                        abstainPercentage = 0n
                    } else {
                        ayePercentage =
                            vote.balance.aye /
                            (vote.balance.aye +
                                vote.balance.nay +
                                vote.balance.abstain)
                        nayPercentage =
                            vote.balance.nay /
                            (vote.balance.aye +
                                vote.balance.nay +
                                vote.balance.abstain)
                        abstainPercentage =
                            vote.balance.nay /
                            (vote.balance.aye +
                                vote.balance.nay +
                                vote.balance.abstain)
                    }
                    voteBalance = new SplitAbstainVoteBalance({
                        aye: delegation.balance * ayePercentage,
                        nay: delegation.balance * nayPercentage,
                        abstain: delegation.balance * abstainPercentage,
                    })

                }
                break;
        }

        await ctx.store.insert(
            new ConvictionVote({
                id: `${referendum.id}-${count.toString().padStart(8, '0')}`,
                referendumIndex: referendum.index,
                voter: delegation.wallet,
                blockNumberVoted: block,
                decision: vote.decision,
                lockPeriod: delegation.lockPeriod,
                referendum: referendum,
                balance: voteBalance,
                direction: vote.direction,
                timestamp: new Date(blockTime),
                delegatedTo: delegation.to,
                type: VoteType.Delegated,
                isValidator: validators.length > 0 ? validators.includes(delegation.wallet) : null
            })
        )
    }
}


export async function getDelegations(ctx: BatchContext<Store, unknown>, voter: string | undefined, track: number): Promise<any> {
    let delegations = await ctx.store.find(ConvictionVotingDelegation, { where: { to: voter, blockNumberEnd: IsNull(), track } })
    if (delegations && delegations.length > 0) {
        return delegations
    }
    else {
        return []
    }
}


