import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import {
    TechnicalCommitteeApprovedEvent,
    TechnicalCommitteeProposedEvent,
} from '../../../types/events'
import { Event } from '../../../types/support'

export interface ProposedData {
    proposer: Uint8Array
    index: number
    hash: Uint8Array
    threshold: number
}

export function getProposedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): ProposedData {
    const event = new TechnicalCommitteeProposedEvent(ctx, itemEvent)
    if (event.isV1020) {
        const [proposer, index, hash, threshold] = event.asV1020
        return {
            proposer,
            index,
            hash,
            threshold,
        }
    } else if (event.isV9130) {
        const { account, proposalIndex, proposalHash, threshold } = event.asV9130
        return {
            proposer: account,
            index: proposalIndex,
            hash: proposalHash,
            threshold,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getApprovedData(ctx: BatchContext<Store, unknown>, itemEvent: Event): Uint8Array {
    const event = new TechnicalCommitteeApprovedEvent(ctx, itemEvent)
    if (event.isV1020) {
        return event.asV1020
    } else if (event.isV9130) {
        return event.asV9130.proposalHash
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}