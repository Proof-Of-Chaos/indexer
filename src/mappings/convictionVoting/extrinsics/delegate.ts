import { encodeId, getOriginAccountId, ss58codec } from '../../../common/tools'
import { getDelegateData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { TooManyOpenDelegations, TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { addOngoingReferendaDelegatedVotes, removeDelegatedVotesOngoingReferenda, removeVote } from './helpers'
import { OpenGovReferendum, StandardVoteBalance, ConvictionVote, VoteType, ConvictionVotingDelegation } from '../../../model'
import { getVotesCount } from './vote'
import { currentCouncilMembers, setCouncilMembers } from '../../election/events/newTerm'
import { currentValidators, setValidators } from '../../session/events/newSession'
import { CouncilMembersStorage, SessionValidatorsStorage } from '../../../types/storage'

export async function handleDelegate(ctx: BatchContext<Store, unknown>,
    item: CallItem<'ConvictionVoting.delegate', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { to, lockPeriod, balance, track } = getDelegateData(ctx, item.call)
    const toWallet = ss58codec.encode(to)
    const wallet = getOriginAccountId(item.call.origin)
    const delegations = await ctx.store.find(ConvictionVotingDelegation, { where: { wallet, blockNumberEnd: IsNull(), track } })

    if (delegations.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenDelegations(header.height, track, wallet))
    }
    //get ongoingReferenda for track
    const ongoingReferenda = await ctx.store.find(OpenGovReferendum, { where: { endedAt: IsNull(), track } })
    if (delegations.length > 0) {
        const delegation = delegations[0]
        delegation.blockNumberEnd = header.height
        delegation.timestampEnd = new Date(header.timestamp)
        await ctx.store.save(delegation)
        //remove votes for ongoing referenda
        for (let i = 0; i < ongoingReferenda.length; i++) {
            const referendum = ongoingReferenda[i]
            await removeVote(ctx, wallet, referendum.index, header.height, header.timestamp, false, VoteType.Delegated, delegation.to)
        }
    }

    await removeDelegatedVotesOngoingReferenda(ctx, wallet, header.height, header.timestamp, track)

    await ctx.store.insert(
        new ConvictionVotingDelegation({
            id: `${await ctx.store.count(ConvictionVotingDelegation)}`,
            blockNumberStart: header.height,
            wallet: getOriginAccountId(item.call.origin),
            to: toWallet,
            balance,
            lockPeriod,
            track,
            timestamp: new Date(header.timestamp),
        })
    )
    // add votes for ongoing referenda for this track
    for (let i = 0; i < ongoingReferenda.length; i++) {
        const referendum = ongoingReferenda[i]
        const votes = await ctx.store.find(ConvictionVote, { where: { voter: toWallet, referendumIndex: referendum.index, blockNumberRemoved: IsNull() } })
        if (votes.length > 1) {
            ctx.log.warn(TooManyOpenVotes(header.height, referendum.index, toWallet))
            return
        }
        else if (votes.length === 0) {
            //to wallet didn't vote yet
            // ctx.log.warn(NoOpenVoteFound(header.height, referendum.index, toAddress))
            return
        }
        const vote = votes[0]
        const voteBalance = new StandardVoteBalance({
            value: balance,
        })
        const voter = item.call.origin ? getOriginAccountId(item.call.origin) : null
        const count = await getVotesCount(ctx, referendum.id)
        const validators = currentValidators || setValidators(ctx, header)
        await ctx.store.insert(
            new ConvictionVote({
                id: `${referendum.id}-${count.toString().padStart(8, '0')}`,
                referendumIndex: referendum.index,
                voter,
                blockNumberVoted: header.height,
                decision: vote.decision,
                direction: vote.direction,
                lockPeriod,
                referendum,
                balance: voteBalance,
                timestamp: new Date(header.timestamp),
                delegatedTo: toWallet,
                type: VoteType.Delegated,
                isValidator: voter && validators.length > 0 ? validators.includes(voter) : null
            })
        )
    }
    await addOngoingReferendaDelegatedVotes(ctx, wallet, header, track)
}