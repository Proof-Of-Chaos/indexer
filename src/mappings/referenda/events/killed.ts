import { Store } from '@subsquid/typeorm-store'
import { OpenGovReferendumStatus } from '../../../model'
import { getReferendumInfoOf } from '../../../storage/referenda/referendumInfoOf'
import { updateOpenGovReferendum } from '../../utils/proposals'
import { getKilledData } from './getters'
import { Block, Event, ProcessorContext } from '../../../processor'

export async function handleKilled(ctx: ProcessorContext<Store>,
    item: Event,
    header: Block): Promise<void> {
    const { index, ayes, nays, support } = getKilledData(ctx, item)
    // get referenda data
    const storageData = await getReferendumInfoOf(ctx, index, header)
    if (!storageData) {
        ctx.log.warn(`Storage doesn't exist for referendum at block ${header.height}`)
        return
    }
    await updateOpenGovReferendum(ctx, index, OpenGovReferendumStatus.Killed, header, storageData)
}
