import { OpenGovReferendum, ConvictionVote } from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { Store } from '@subsquid/typeorm-store'
import { MissingReferendumWarn } from '../../utils/errors'
import { getDelegations, removeDelegatedVotesReferendum, removeVote } from './helpers'
import { ProcessorContext, Call, Block } from '../../../processor'
import assert from 'assert'

export async function handleRemoveVote(ctx: ProcessorContext<Store>,
    item: Call,
    header: Block): Promise<void> {
    if (!item.success) return
    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)
    const { index } = getRemoveVoteData(ctx, item)
    const referendum = await ctx.store.get(OpenGovReferendum, { where: { index } })
    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }
    if (referendum.endedAtBlock && referendum.endedAtBlock < header.height) {
        //ref already ended probably removing vote for democracy_unlock
        return
    }
    const wallet = getOriginAccountId(item.origin)
    await removeVote(ctx, wallet, index, header.height, header.timestamp, true)
    let delegations = await getDelegations(ctx, wallet, referendum.track)
    await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, index, delegations)
}
