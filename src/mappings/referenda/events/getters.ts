import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { ProcessorContext, Event } from '../../../processor'
import { events } from '../../../types'

export interface CancelledData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getCancelledData(ctx: ProcessorContext<Store>, itemEvent: Event): CancelledData {
    const event = events.referenda.cancelled

    if (event.v9320.is(itemEvent)) {
        const { index, tally } = event.v9320.decode(itemEvent)
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConfirmedData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getConfirmedData(ctx: ProcessorContext<Store>, itemEvent: Event): ConfirmedData {
    const event = events.referenda.confirmed

    if (event.v9320.is(itemEvent)) {
        const { index, tally } = event.v9320.decode(itemEvent)
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

// export function getExecutedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
//     const event = new DemocracyExecutedEvent(ctx, itemEvent)
//     if (event.isV1020) {
//         return event.asV1020[0]
//     } else if (event.isV9090) {
//         return event.asV9090[0]
//     } else if (event.isV9111) {
//         return event.asV9111[0]
//     } else {
//         const data = ctx._chain.decodeEvent(itemEvent)
//         return data.refIndex
//     }
// }

export interface RejectedData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getRejectedData(ctx: ProcessorContext<Store>, itemEvent: Event): RejectedData {
    const event = events.referenda.rejected
    if (event.v9320.is(itemEvent)) {
        const { index, tally } = event.v9320.decode(itemEvent)
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface TimedOutData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getTimedOutData(ctx: ProcessorContext<Store>, itemEvent: Event): TimedOutData {
    const event = events.referenda.timedOut

    if (event.v9320.is(itemEvent)) {
        const { index, tally } = event.v9320.decode(itemEvent)
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface KilledData {
    index: number
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getKilledData(ctx: ProcessorContext<Store>, itemEvent: Event): KilledData {
    const event = events.referenda.killed
    if (event.v9320.is(itemEvent)) {
        const { index, tally } = event.v9320.decode(itemEvent)
        return {
            index,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getApprovedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    const event = events.referenda.approved

    if (event.v9320.is(itemEvent)) {
        return event.v9320.decode(itemEvent).index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmStartedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    const event = events.referenda.confirmStarted
    if (event.v9320.is(itemEvent)) {
        return event.v9320.decode(itemEvent).index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export function getConfirmAbortedData(ctx: ProcessorContext<Store>, itemEvent: Event): number {
    const event = events.referenda.confirmAborted
    if (event.v9320.is(itemEvent)) {
        return event.v9320.decode(itemEvent).index
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageInvalidData {
    hash: string
    index: number
}

export function getPreimageInvalidData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageInvalidData {
    const event = events.democracy.preimageInvalid

    if (event.v1022.is(itemEvent)) {
        const [hash, index] = event.v1022.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalHash: hash, refIndex: index } = event.v9130.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageMissingData {
    hash: string
    index: number
}

export function getPreimageMissingData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageMissingData {
    const event = events.democracy.preimageMissing
    if (event.v1022.is(itemEvent)) {
        const [hash, index] = event.v1022.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalHash: hash, refIndex: index } = event.v9130.decode(itemEvent)
        return {
            hash,
            index,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

interface PreimageNotedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageNotedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageNotedData {
    const event = events.democracy.preimageNoted
    if (event.v1022.is(itemEvent)) {
        const [hash, provider, deposit] = event.v1022.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalHash: hash, who: provider, deposit } = event.v9130.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageReapedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageReapedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageReapedData {
    const event = events.democracy.preimageReaped

    if (event.v1022.is(itemEvent)) {
        const [hash, provider, deposit] = event.v1022.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalHash: hash, provider, deposit } = event.v9130.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface PreimageUsedData {
    hash: string
    provider: string
    deposit: bigint
}

export function getPreimageUsedData(ctx: ProcessorContext<Store>, itemEvent: Event): PreimageUsedData {
    const event = events.democracy.preimageUsed

    if (event.v1022.is(itemEvent)) {
        const [hash, provider, deposit] = event.v1022.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalHash: hash, provider, deposit } = event.v9130.decode(itemEvent)
        return {
            hash,
            provider,
            deposit,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ReferendumOpenGovEventData {
    index: number
    track: number
    hash: string
    ayes: bigint
    nays: bigint
    support: bigint
}

export function getDecisionStartedData(ctx: ProcessorContext<Store>, itemEvent: Event): ReferendumOpenGovEventData {
    const event = events.referenda.decisionStarted

    if (event.v9320.is(itemEvent)) {
        const { index, track, proposal, tally } = event.v9320.decode(itemEvent)
        let hash
        switch (proposal.__kind) {
            case "Legacy":
                hash = proposal.hash
                break;
            case "Inline":
                hash = proposal.value
                break;
            case "Lookup":
                hash = proposal.hash
                break;
        }
        return {
            index,
            track,
            hash,
            ayes: tally.ayes,
            nays: tally.nays,
            support: tally.support
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface SubmittedData {
    index: number
    track: number
    hash: string
    len: number | undefined
}

export function getSubmittedData(ctx: ProcessorContext<Store>, itemEvent: Event): SubmittedData {
    const event = events.referenda.submitted
    if (event.v9320.is(itemEvent)) {
        const { index, track, proposal } = event.v9320.decode(itemEvent)
        let hash
        let len
        switch (proposal.__kind) {
            case "Legacy":
                hash = proposal.hash
                break;
            case "Inline":
                hash = proposal.value
                break;
            case "Lookup":
                hash = proposal.hash
                len = proposal.len
                break;
        }
        return {
            index,
            track,
            hash,
            len
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

interface TabledEventData {
    index: number
    deposit: bigint
    depositors?: string[]
}

export function getTabledEventData(ctx: ProcessorContext<Store>, itemEvent: Event): TabledEventData {
    const event = events.democracy.tabled
    if (event.v1020.is(itemEvent)) {
        const [index, deposit, depositors] = event.v1020.decode(itemEvent)
        return {
            index,
            deposit,
            depositors,
        }
    } else if (event.v9130.is(itemEvent)) {
        const { proposalIndex: index, deposit, depositors } = event.v9130.decode(itemEvent)
        return {
            index,
            deposit,
            depositors,
        }
    } else if (event.v9320.is(itemEvent)) {
        const { proposalIndex: index, deposit } = event.v9320.decode(itemEvent)
        return {
            index,
            deposit
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}
