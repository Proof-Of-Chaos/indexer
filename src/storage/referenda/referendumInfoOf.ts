import { UnknownVersionError } from '../../common/errors'
import { ReferendaReferendumInfoForStorage } from '../../types/storage'
import * as v1055 from '../../types/v1055'
import * as v9111 from '../../types/v9111'
import * as v9320 from '../../types/v9320'
import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
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
    hash: Uint8Array
    len: number | undefined
    submitted: number
    submissionDepositWho: Uint8Array
    submissionDepositAmount: bigint
    decisionDepositWho: Uint8Array | undefined
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

async function getStorageData(ctx: BatchContext<Store, unknown>, index: number, block: SubstrateBlock): Promise<OpenGovReferendumStorageData | undefined> {
    const storage = new ReferendaReferendumInfoForStorage(ctx, block)
    if (storage.isV9320) {
        const storageData = await storage.asV9320.get(index)
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
    else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getReferendumInfoOf(ctx: BatchContext<Store, unknown>, index: number, block: SubstrateBlock) {
    return await getStorageData(ctx, index, block)
}
