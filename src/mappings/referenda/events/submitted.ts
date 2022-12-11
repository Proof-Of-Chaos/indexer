import { getSubmittedData } from './getters'
import { BatchContext, SubstrateBlock, toHex } from '@subsquid/substrate-processor'
import {
    OpenGovReferendum,
    OpenGovReferendumStatus,
    OpenGovReferendumStatusHistory,
} from '../../../model'
import { Store } from '@subsquid/typeorm-store'
import { getReferendumInfoOf } from '../../../storage/referenda'
import { BalancesTotalIssuanceStorage } from '../../../types/storage'
import { EventItem } from '@subsquid/substrate-processor/lib/interfaces/dataSelection'
import { ss58codec } from '../../../common/tools'
import { toJSON } from '@subsquid/util-internal-json'
import { getPreimageProposalCall } from '../../utils/preimages'

export async function handleSubmitted(ctx: BatchContext<Store, unknown>,
    item: EventItem<'Referenda.Submitted', { event: { args: true; extrinsic: { hash: true } } }>,
    header: SubstrateBlock): Promise<void> {
    const { index, track, hash, len } = getSubmittedData(ctx, item.event)
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

    let status,
        originKind,
        enactmentKind,
        enactmentValue,
        submitted,
        submissionDepositAmount,
        submissionDepositWho,
        decisionDepositAmount,
        decisionDepositWho,
        decidingSince,
        decidingConfirming,
        inQueue,
        ayes,
        nays,
        support,
        alarm
    if (storageData.status === 'Ongoing') {
        ({
            status,
            originKind,
            // originValue: origin.value,
            enactmentKind,
            enactmentValue,
            submitted,
            submissionDepositAmount,
            submissionDepositWho,
            decisionDepositAmount,
            decisionDepositWho,
            decidingSince,
            decidingConfirming,
            ayes,
            nays,
            support,
            inQueue,
            alarm
        } = storageData)
    }
    const id = await getReferendumId(ctx.store)
    const decodedCall = await getPreimageProposalCall(ctx, hash, len, header)
    
    const referendum = new OpenGovReferendum({
        id,
        index,
        status: OpenGovReferendumStatus.Submitted,
        track,
        originKind,
        enactmentKind,
        enactmentValue,
        hash: toHex(hash),
        len,
        submitted,
        submissionDepositAmount,
        submissionDepositWho: submissionDepositWho ? ss58codec.encode(submissionDepositWho) : undefined,
        decisionDepositAmount,
        decisionDepositWho: decisionDepositWho ? ss58codec.encode(decisionDepositWho) : undefined,
        decidingSince,
        decidingConfirming,
        ayes,
        nays,
        support,
        inQueue,
        alarm: toJSON(alarm),
        statusHistory: [],
        createdAtBlock: header.height,
        createdAt: new Date(header.timestamp),
        totalIssuance: await new BalancesTotalIssuanceStorage(ctx, header).asV1020.get() || 0n,
        preimageSection: decodedCall?.section,
        preimageMethod: decodedCall?.method,
        preimageDescription: decodedCall?.description,
        preimageArgs: toJSON(decodedCall?.args)
    })

    referendum.statusHistory.push(
        new OpenGovReferendumStatusHistory({
            block: referendum.createdAtBlock,
            timestamp: referendum.createdAt,
            status: referendum.status,
        })
    )

    await ctx.store.insert(referendum)
}

async function getReferendumId(store: Store) {
    const count = await store.count(OpenGovReferendum)

    return `${count
        .toString()
        .padStart(8, '0')}`
}