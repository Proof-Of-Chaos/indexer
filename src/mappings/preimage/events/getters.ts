import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { ProcessorContext, Event } from '../../../processor'
import { events } from '../../../types'

interface PreimageNotedData {
    hash: string
}

export function getPreimageNotedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageNotedData {
    const event = events.preimage.noted
    if (event.v9160.is(itemEvent)) {
        const {hash} = event.v9160.decode(itemEvent)
        return {
            hash
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}