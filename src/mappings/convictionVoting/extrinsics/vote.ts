import {
    OpenGovReferendum,
    SplitVoteBalance,
    SplitAbstainVoteBalance,
    StandardVoteBalance,
    ConvictionVote,
    VoteBalanceOpenGov,
    VoteDecisionOpenGov,
    VoteType,
    VoteDirectionOpenGov,
} from '../../../model'
import { ProcessorContext, Call, Block } from '../../../processor'
import { encodeId, getOriginAccountId } from '../../../common/tools'
import { getVoteData } from './getters'
import { MissingOpenGovReferendumWarn } from '../../utils/errors'
import { Store } from '@subsquid/typeorm-store'
import { TooManyOpenVotes } from './errors'
import { IsNull } from 'typeorm'
import { addDelegatedVotesReferendum, getDelegations, removeDelegatedVotesReferendum, } from './helpers'
import { currentValidators, setValidators } from '../../session/events/newSession'
import assert from 'assert'

export async function handleVote(ctx: ProcessorContext<Store>,
    call: Call,
    header: Block): Promise<void> {
    if (!call.success) return

    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)

    const { index, vote } = getVoteData(ctx, call)

    const wallet = getOriginAccountId(call.origin)
    const votes = await ctx.store.find(ConvictionVote, { where: { voter: wallet, referendumIndex: index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        //should never be the case
        ctx.log.warn(TooManyOpenVotes(header.height, index, wallet))
    }
    if (votes.length > 0) {
        const vote = votes[0]
        vote.blockNumberRemoved = header.height
        vote.timestampRemoved = new Date(header.timestamp)
        await ctx.store.save(vote)
    }


    const openGovReferendum = await ctx.store.get(OpenGovReferendum, { where: { index } })
    if (!openGovReferendum) {
        // ctx.log.warn(MissingOpenGovReferendumWarn(index))
        return
    }

    const delegations = await getDelegations(ctx, wallet, openGovReferendum.track)
    await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, index, delegations)

    let decision: VoteDecisionOpenGov
    switch (vote.type) {
        case 'Standard':
            decision = vote.value < 128 ? VoteDecisionOpenGov.no : VoteDecisionOpenGov.yes
            break
        case 'Split':
            decision = VoteDecisionOpenGov.split
            break
        case 'SplitAbstain':
            decision = VoteDecisionOpenGov.splitAbstain
            break
        default:
            throw new Error(`Unexpected vote type`);
    }

    let lockPeriod: number | undefined
    let balance: VoteBalanceOpenGov | undefined
    let direction: VoteDirectionOpenGov | undefined
    if (vote.type === 'Split') {
        balance = new SplitVoteBalance({
            aye: vote.aye,
            nay: vote.nay,
        })
        direction = vote.aye >= vote.nay ? VoteDirectionOpenGov.yes : VoteDirectionOpenGov.no
    }
    else if (vote.type === 'SplitAbstain') {
        balance = new SplitAbstainVoteBalance({
            aye: vote.aye,
            nay: vote.nay,
            abstain: vote.abstain,
        })
        direction = vote.abstain >= vote.aye && vote.abstain >= vote.nay
            ? VoteDirectionOpenGov.abstain
            : vote.aye >= vote.nay
                ? VoteDirectionOpenGov.yes
                : VoteDirectionOpenGov.no
    }
    else if (vote.type === 'Standard') {
        balance = new StandardVoteBalance({
            value: vote.balance,
        })
        lockPeriod = vote.value < 128 ? vote.value : vote.value - 128
        direction = decision == VoteDecisionOpenGov.yes ? VoteDirectionOpenGov.yes : VoteDirectionOpenGov.no
    }

    const count = await getVotesCount(ctx, openGovReferendum.id)
    const voter = call.origin ? getOriginAccountId(call.origin) : null

    const validators = currentValidators || setValidators(ctx, header)
    await ctx.store.insert(
        new ConvictionVote({
            id: `${openGovReferendum.id}-${count.toString().padStart(8, '0')}`,
            referendumIndex: index,
            voter,
            blockNumberVoted: header.height,
            decision,
            direction,
            lockPeriod,
            referendum: openGovReferendum,
            balance,
            timestamp: new Date(header.timestamp),
            type: VoteType.Direct,
            isValidator: voter && validators.length > 0 ? validators.includes(voter) : null
        })
    )
    await addDelegatedVotesReferendum(ctx, wallet, header.height, header.timestamp, openGovReferendum, delegations, validators, openGovReferendum.track)
}

const proposalsVotes = new Map<string, number>()

export async function getVotesCount(ctx: ProcessorContext<Store>, referendumId: string) {
    let count = proposalsVotes.get(referendumId) || 0
    if (count == null) {
        count = await ctx.store.count(ConvictionVote, {
            where: {
                referendumId,
            },
        })
    }
    proposalsVotes.set(referendumId, count + 1)
    return count
}