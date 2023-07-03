import { OpenGovReferendum, ConvictionVote } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getRemoveOtherVoteData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { IsNull } from 'typeorm'
import { NoOpenVoteFound, TooManyOpenVotes } from './errors'
import { MissingReferendumWarn } from '../../utils/errors'
import { getDelegations, removeDelegatedVotesReferendum } from './helpers'

export async function handleRemoveOtherVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'ConvictionVoting.remove_other_vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { target, index } = getRemoveOtherVoteData(ctx, item.call)
    const referendum = await ctx.store.get(OpenGovReferendum, { where: { index } })
    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }
    if (referendum.endedAtBlock && referendum.endedAtBlock < header.height) {
        //ref already ended probably removing vote for democracy_unlock
        return
    }
    if (!target){
        return
    } 
    const wallet = ss58codec.encode(target)
    const votes = await ctx.store.find(ConvictionVote, { where: { voter: wallet, referendumIndex: index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(header.height, index, wallet))
    }
    else if (votes.length === 0) {
        ctx.log.warn(NoOpenVoteFound(header.height, index, wallet))
        return
    }
    const vote = votes[0]
    vote.blockNumberRemoved = header.height
    vote.timestampRemoved = new Date(header.timestamp)
    await ctx.store.save(vote)
    let delegations = await getDelegations(ctx, wallet, referendum.track)
    await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, index, delegations)
}
