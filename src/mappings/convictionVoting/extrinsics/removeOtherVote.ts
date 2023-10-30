import { OpenGovReferendum, ConvictionVote } from '../../../model'
import { ss58codec } from '../../../common/tools'
import { getRemoveOtherVoteData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { IsNull } from 'typeorm'
import { NoOpenVoteFound, TooManyOpenVotes } from './errors'
import { MissingReferendumWarn } from '../../utils/errors'
import { getDelegations, removeDelegatedVotesReferendum } from './helpers'
import { ProcessorContext, Call, Block } from '../../../processor'
import assert from 'assert'

export async function handleRemoveOtherVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: Block): Promise<void> {
    if (!item.success) return
    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)
    const { target, index } = getRemoveOtherVoteData(ctx, item)
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
