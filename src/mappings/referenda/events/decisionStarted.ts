import {
    OpenGovReferendumStatus,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getDecisionStartedData } from './getters'
import { getReferendumInfoOf } from '../../../storage/referenda'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getPreimageProposalCall } from '../../utils/preimages'
import { Block, Event, ProcessorContext } from '../../../processor'


export async function handleDecisionStarted(ctx: ProcessorContext<Store>,
    event: Event,
    header: Block): Promise<void> {
    let { index, track, hash, ayes, nays, support } = getDecisionStartedData(ctx, event)
    // get referenda data
    const storageData = await getReferendumInfoOf(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for referendum at block ${header.height}`)
        return
    }
    if (storageData.status === 'Finished') {
        ctx.log.warn(`OpenGovReferendum with index ${index} has already finished at block ${header.height}`)
        return
    }

    let decodedCall
    if (storageData.len){
        decodedCall = await getPreimageProposalCall(ctx, hash, storageData.len, header)
    }
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.DecisionStarted, header, storageData, decodedCall)
}