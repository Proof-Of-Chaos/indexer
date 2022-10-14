import { Referendum, Vote } from '../../../model'
import { getOriginAccountId, ss58codec } from '../../../common/tools'
import { getRemoveOtherVoteData, getRemoveVoteData } from './getters'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { CallItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { IsNull } from 'typeorm'
import { NoOpenVoteFound, TooManyOpenVotes } from './errors'
import { MissingReferendumWarn } from '../../utils/errors'

export async function handleRemoveOtherVote(ctx: BatchContext<Store, unknown>,
    item: CallItem<'Democracy.remove_other_vote', { call: { args: true; origin: true; } }>,
    header: SubstrateBlock): Promise<void> {
    if (!(item.call as any).success) return
    const { target, index } = getRemoveOtherVoteData(ctx, item.call)
    const voter = ss58codec.encode(target)
    const votes = await ctx.store.find(Vote, { where: { voter, referendumIndex: index, blockNumberRemoved: IsNull() } })
    if (votes.length > 1) {
        ctx.log.warn(TooManyOpenVotes(header.height, index, voter))
    }
    else if (votes.length === 0) {
        const referendum = await ctx.store.get(Referendum, { where: { index } })
        if (!referendum) {
            ctx.log.warn(MissingReferendumWarn(index))
            return
        }
        if (referendum.endsAt > header.height) {
            ctx.log.warn(NoOpenVoteFound(header.height, index, voter))
            return
        }
        else {
            //ref already expired
            return
        }
        
    }
    const vote = votes[0]
    vote.blockNumberRemoved = header.height
    await ctx.store.save(vote)
}