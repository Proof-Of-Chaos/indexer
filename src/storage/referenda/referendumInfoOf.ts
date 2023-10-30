import { UnknownVersionError } from '../../common/errors'
import { Block, ProcessorContext } from '../../processor'
import { storage } from '../../types'
import * as v1055 from '../../types/v1055'
import * as v9111 from '../../types/v9111'
import * as v9320 from '../../types/v9320'
import * as v9350 from '../../types/v9350'
import * as v9370 from '../../types/v9370'
import * as v9381 from '../../types/v9381'
import * as v9420 from '../../types/v9420'
import { Store } from '@subsquid/typeorm-store'

type OpenGovFinishedReferendumData = {
    status: 'Finished'
    approved: boolean
    end: number
}

type OpenGovOngoingReferendumData = {
    status: 'Ongoing'
    track: number
    originKind: string
    // originValue: undefined
    enactmentKind: string
    enactmentValue: number
    hash: string
    len: number | undefined
    submitted: number
    submissionDepositWho: string
    submissionDepositAmount: bigint
    decisionDepositWho: string | undefined
    decisionDepositAmount: bigint | undefined
    decidingSince: number | undefined
    decidingConfirming: number | undefined
    ayes: bigint
    nays: bigint
    support: bigint
    inQueue: boolean
    alarm: [number, [number, number]] | undefined
}

type OpenGovReferendumStorageData = OpenGovFinishedReferendumData | OpenGovOngoingReferendumData

async function getStorageData(ctx: ProcessorContext<Store>, index: number, block: Block): Promise<OpenGovReferendumStorageData | undefined> {
    const storageItem = storage.referenda.referendumInfoFor
    if (storageItem.v9320.is(block)) {
        const storageData = await storageItem.v9320.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { track, origin, proposal, enactment, submitted, submissionDeposit, decisionDeposit, deciding, tally, inQueue, alarm } = (storageData as v9320.Type_620_Ongoing).value
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
            // FIXME: currently not storing origin value attribute
            // switch (origin.__kind) {
            //     case "system":
            //         hash = proposal.hash
            //         break;
            //     case "Council":
            //         hash = proposal.value
            //         break;
            //     case "TechnicalCommittee":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Origins":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "ParachainsOrigin":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "XcmPallet":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Void":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            // }

            return {
                track,
                status,
                originKind: origin.__kind,
                // originValue: origin.value,
                enactmentKind: enactment.__kind,
                enactmentValue: enactment.value,
                hash,
                len,
                submitted,
                submissionDepositAmount: submissionDeposit.amount,
                submissionDepositWho: submissionDeposit.who,
                decisionDepositAmount: decisionDeposit?.amount,
                decisionDepositWho: decisionDeposit?.who,
                decidingSince: deciding?.since,
                decidingConfirming: deciding?.confirming,
                ayes: tally.ayes,
                nays: tally.nays,
                support: tally.support,
                inQueue,
                alarm
            }
        }
        else if (status === 'Killed') {
            const value = (storageData as v9320.Type_620_Killed).value
        }
        else {
            const [end, deposit1, deposit2] = (storageData as v9320.Type_620_Approved | v9320.Type_620_Rejected).value

            // const { end, approved } = storageData as v9320.ReferendumInfo_Finished
            return {
                status: 'Finished',//storageData.__kind,
                approved: storageData.__kind === 'Approved',
                end
            }
        }
    }
    else if (storageItem.v9350.is(block)) {
        const storageData = await storageItem.v9350.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { track, origin, proposal, enactment, submitted, submissionDeposit, decisionDeposit, deciding, tally, inQueue, alarm } = (storageData as v9350.Type_620_Ongoing).value
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
            // FIXME: currently not storing origin value attribute
            // switch (origin.__kind) {
            //     case "system":
            //         hash = proposal.hash
            //         break;
            //     case "Council":
            //         hash = proposal.value
            //         break;
            //     case "TechnicalCommittee":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Origins":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "ParachainsOrigin":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "XcmPallet":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Void":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            // }

            return {
                track,
                status,
                originKind: origin.__kind,
                // originValue: origin.value,
                enactmentKind: enactment.__kind,
                enactmentValue: enactment.value,
                hash,
                len,
                submitted,
                submissionDepositAmount: submissionDeposit.amount,
                submissionDepositWho: submissionDeposit.who,
                decisionDepositAmount: decisionDeposit?.amount,
                decisionDepositWho: decisionDeposit?.who,
                decidingSince: deciding?.since,
                decidingConfirming: deciding?.confirming,
                ayes: tally.ayes,
                nays: tally.nays,
                support: tally.support,
                inQueue,
                alarm
            }
        }
        else if (status === 'Killed') {
            const value = (storageData as v9350.Type_620_Killed).value
        }
        else {
            const [end, deposit1, deposit2] = (storageData as v9350.Type_620_Approved | v9350.Type_620_Rejected | v9350.Type_620_Cancelled | v9350.Type_620_TimedOut).value

            // const { end, approved } = storageData as v9320.ReferendumInfo_Finished
            return {
                status: 'Finished',//storageData.__kind,
                approved: storageData.__kind === 'Approved',
                end
            }
        }
    }
    else if (storageItem.v9370.is(block)) {
        const storageData = await storageItem.v9370.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { track, origin, proposal, enactment, submitted, submissionDeposit, decisionDeposit, deciding, tally, inQueue, alarm } = (storageData as v9370.Type_621_Ongoing).value
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
            // FIXME: currently not storing origin value attribute
            // switch (origin.__kind) {
            //     case "system":
            //         hash = proposal.hash
            //         break;
            //     case "Council":
            //         hash = proposal.value
            //         break;
            //     case "TechnicalCommittee":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Origins":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "ParachainsOrigin":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "XcmPallet":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Void":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            // }

            return {
                track,
                status,
                originKind: origin.__kind,
                // originValue: origin.value,
                enactmentKind: enactment.__kind,
                enactmentValue: enactment.value,
                hash,
                len,
                submitted,
                submissionDepositAmount: submissionDeposit.amount,
                submissionDepositWho: submissionDeposit.who,
                decisionDepositAmount: decisionDeposit?.amount,
                decisionDepositWho: decisionDeposit?.who,
                decidingSince: deciding?.since,
                decidingConfirming: deciding?.confirming,
                ayes: tally.ayes,
                nays: tally.nays,
                support: tally.support,
                inQueue,
                alarm
            }
        }
        else if (status === 'Killed') {
            const value = (storageData as v9370.Type_621_Killed).value
        }
        else {
            const [end, deposit1, deposit2] = (storageData as v9370.Type_621_Approved | v9370.Type_621_Rejected | v9370.Type_621_Cancelled | v9370.Type_621_TimedOut).value

            // const { end, approved } = storageData as v9320.ReferendumInfo_Finished
            return {
                status: 'Finished',//storageData.__kind,
                approved: storageData.__kind === 'Approved',
                end
            }
        }
    }
    else if (storageItem.v9381.is(block)) {
        const storageData = await storageItem.v9381.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { track, origin, proposal, enactment, submitted, submissionDeposit, decisionDeposit, deciding, tally, inQueue, alarm } = (storageData as v9381.Type_626_Ongoing).value
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
            // FIXME: currently not storing origin value attribute
            // switch (origin.__kind) {
            //     case "system":
            //         hash = proposal.hash
            //         break;
            //     case "Council":
            //         hash = proposal.value
            //         break;
            //     case "TechnicalCommittee":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Origins":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "ParachainsOrigin":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "XcmPallet":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Void":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            // }

            return {
                track,
                status,
                originKind: origin.__kind,
                // originValue: origin.value,
                enactmentKind: enactment.__kind,
                enactmentValue: enactment.value,
                hash,
                len,
                submitted,
                submissionDepositAmount: submissionDeposit.amount,
                submissionDepositWho: submissionDeposit.who,
                decisionDepositAmount: decisionDeposit?.amount,
                decisionDepositWho: decisionDeposit?.who,
                decidingSince: deciding?.since,
                decidingConfirming: deciding?.confirming,
                ayes: tally.ayes,
                nays: tally.nays,
                support: tally.support,
                inQueue,
                alarm
            }
        }
        else if (status === 'Killed') {
            const value = (storageData as v9381.Type_626_Killed).value
        }
        else {
            const [end, deposit1, deposit2] = (storageData as v9381.Type_626_Approved | v9381.Type_626_Rejected | v9381.Type_626_Cancelled | v9381.Type_626_TimedOut).value

            // const { end, approved } = storageData as v9320.ReferendumInfo_Finished
            return {
                status: 'Finished',//storageData.__kind,
                approved: storageData.__kind === 'Approved',
                end
            }
        }
    }
    else if (storageItem.v9420.is(block)) {
        const storageData = await storageItem.v9420.get(block, index)
        if (!storageData) return undefined

        const { __kind: status } = storageData
        if (status === 'Ongoing') {
            const { track, origin, proposal, enactment, submitted, submissionDeposit, decisionDeposit, deciding, tally, inQueue, alarm } = (storageData as v9420.ReferendumInfo_Ongoing).value
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
            // FIXME: currently not storing origin value attribute
            // switch (origin.__kind) {
            //     case "system":
            //         hash = proposal.hash
            //         break;
            //     case "Council":
            //         hash = proposal.value
            //         break;
            //     case "TechnicalCommittee":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Origins":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "ParachainsOrigin":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "XcmPallet":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            //     case "Void":
            //         hash = proposal.hash
            //         len = proposal.len
            //         break;
            // }

            return {
                track,
                status,
                originKind: origin.__kind,
                // originValue: origin.value,
                enactmentKind: enactment.__kind,
                enactmentValue: enactment.value,
                hash,
                len,
                submitted,
                submissionDepositAmount: submissionDeposit.amount,
                submissionDepositWho: submissionDeposit.who,
                decisionDepositAmount: decisionDeposit?.amount,
                decisionDepositWho: decisionDeposit?.who,
                decidingSince: deciding?.since,
                decidingConfirming: deciding?.confirming,
                ayes: tally.ayes,
                nays: tally.nays,
                support: tally.support,
                inQueue,
                alarm
            }
        }
        else if (status === 'Killed') {
            const value = (storageData as v9420.ReferendumInfo_Killed).value
        }
        else {
            const [end, deposit1, deposit2] = (storageData as v9420.ReferendumInfo_Approved | v9420.ReferendumInfo_Rejected | v9420.ReferendumInfo_Cancelled | v9420.ReferendumInfo_TimedOut).value

            // const { end, approved } = storageData as v9320.ReferendumInfo_Finished
            return {
                status: 'Finished',//storageData.__kind,
                approved: storageData.__kind === 'Approved',
                end
            }
        }
    }
    else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getReferendumInfoOf(ctx: ProcessorContext<Store>, index: number, block: Block) {
    return await getStorageData(ctx, index, block)
}
