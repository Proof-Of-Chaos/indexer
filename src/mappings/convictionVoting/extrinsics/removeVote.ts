import { OpenGovReferendum, ConvictionVote } from '../../../model'
import { getOriginAccountId } from '../../../common/tools'
import { getRemoveVoteData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { MissingReferendumWarn } from '../../utils/errors'
import { getDelegations, removeDelegatedVotesReferendum, removeVote } from './helpers'

export async function handleRemoveVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'ConvictionVoting.remove_vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { index } = getRemoveVoteData(ctx, item.call)
    const referendum = await ctx.store.get(OpenGovReferendum, { where: { index } })
    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }
    if (referendum.endedAtBlock && referendum.endedAtBlock < header.height) {
        //ref already ended probably removing vote for democracy_unlock
        return
    }
    const wallet = getOriginAccountId(item.call.origin)
    await removeVote(ctx, wallet, index, header.height, header.timestamp, true)
    let delegations = await getDelegations(ctx, wallet, referendum.track)
    await removeDelegatedVotesReferendum(ctx, header.height, header.timestamp, index, delegations)
}
