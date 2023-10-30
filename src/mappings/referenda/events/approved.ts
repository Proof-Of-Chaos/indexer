import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getApprovedData } from './getters'
import { Block, Event, ProcessorContext } from '../../../processor'

export async function handleApproved(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block): Promise<void> {
    const index = getApprovedData(ctx, item)
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Approved, header)
}
