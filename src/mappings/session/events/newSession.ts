import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { Store } from '@subsquid/typeorm-store'
import { encodeId } from '../../../common/tools'
import { SessionValidatorsStorage } from '../../../types/storage'

export let currentValidators: string[]

export async function handleNewSession(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Session.NewSession', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    await setValidators(ctx, header)
}

export async function setValidators(ctx: BatchContext<Store, unknown>, header: SubstrateBlock): Promise<string[]> {
    currentValidators = new SessionValidatorsStorage(ctx, header).isExists ? (await new SessionValidatorsStorage(ctx, header).asV1020.get()).map(validator => encodeId(validator)) : []
    return currentValidators
}
