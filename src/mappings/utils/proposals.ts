import { Store } from '@subsquid/typeorm-store'
import {
    Preimage,
    PreimageStatus,
    PreimageStatusHistory,
    Referendum,
    OpenGovReferendum,
    ReferendumStatus,
    OpenGovReferendumStatus,
    ReferendumStatusHistory,
    OpenGovReferendumStatusHistory
} from '../../model'
import { MissingPreimageWarn, MissingReferendumWarn } from './errors'
import { toJSON } from '@subsquid/util-internal-json'
import { ss58codec } from '../../common/tools'
import { Block, ProcessorContext } from '../../processor'
import { storage } from '../../types'
import assert from 'assert'

export async function updateReferendum(ctx: ProcessorContext<Store>, index: number, status: ReferendumStatus, header: Block, totalIssuance?: string) {
    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)

    const referendum = await ctx.store.get(Referendum, {
        where: {
            index,
        },
        order: {
            id: 'DESC',
        },
    })

    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }

    referendum.updatedAt = new Date(header.timestamp)
    referendum.updatedAtBlock = header.height
    referendum.status = status
    referendum.totalIssuance = await storage.balances.totalIssuance.v1020.get(header) || 0n

    switch (status) {
        case ReferendumStatus.Passed:
        case ReferendumStatus.NotPassed:
        case ReferendumStatus.Cancelled:
            referendum.endedAt = referendum.updatedAt
            referendum.endedAtBlock = referendum.updatedAtBlock
            ctx.log.info(`Referendum ${index} ended at ${referendum.endedAtBlock} (${referendum.endedAt})`)
    }

    referendum.statusHistory.push(
        new ReferendumStatusHistory({
            block: referendum.updatedAtBlock,
            timestamp: referendum.updatedAt,
            status: referendum.status,
        })
    )

    await ctx.store.save(referendum)
}

export async function updateOpenGovReferendum(ctx: ProcessorContext<Store>, index: number, status: OpenGovReferendumStatus, header: Block, storageData?: any, decodedCall?: any) {
    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)
    const referendum = await ctx.store.get(OpenGovReferendum, {
        where: {
            index,
        },
        order: {
            id: 'DESC',
        },
    })

    if (!referendum) {
        ctx.log.warn(MissingReferendumWarn(index))
        return
    }

    referendum.updatedAt = new Date(header.timestamp)
    referendum.updatedAtBlock = header.height
    referendum.status = status
    referendum.len = storageData.len
    referendum.totalIssuance = await storage.balances.totalIssuance.v1020.get(header) || 0n
    referendum.ayes = storageData.ayes ? storageData.ayes : referendum.ayes 
    referendum.nays = storageData.nays ? storageData.nays : referendum.nays 
    referendum.support = storageData.support ? storageData.support : referendum.support
    referendum.decisionDepositAmount = storageData.decisionDepositAmount ? storageData.decisionDepositAmount : referendum.decisionDepositAmount
    referendum.decisionDepositWho = storageData.decisionDepositWho ? ss58codec.encode(storageData.decisionDepositWho) : referendum.decisionDepositWho
    referendum.decidingSince = storageData.decidingSince ? storageData.decidingSince : referendum.decidingSince
    referendum.decidingConfirming = storageData.decidingConfirming ? storageData.decidingConfirming : referendum.decidingConfirming
    referendum.inQueue = storageData.inQueue ? storageData.inQueue : referendum.inQueue
    referendum.alarm = storageData.alarm ? toJSON(storageData.alarm) : referendum.alarm
    if (decodedCall) {
        referendum.preimageSection = decodedCall.section,
        referendum.preimageMethod = decodedCall.method,
        referendum.preimageDescription = decodedCall.description,
        referendum.preimageArgs = toJSON(decodedCall.args)
    }

    switch (status) {
        case OpenGovReferendumStatus.Confirmed:
        case OpenGovReferendumStatus.Rejected:
        case OpenGovReferendumStatus.TimedOut:
        case OpenGovReferendumStatus.Killed:
        case OpenGovReferendumStatus.Cancelled:
            referendum.endedAt = referendum.updatedAt
            referendum.endedAtBlock = referendum.updatedAtBlock
            ctx.log.info(`OpenGov Referendum ${index} ended at ${referendum.endedAtBlock} (${referendum.endedAt})`)
    }

    referendum.statusHistory.push(
        new OpenGovReferendumStatusHistory({
            block: referendum.updatedAtBlock,
            timestamp: referendum.updatedAt,
            status: referendum.status,
        })
    )

    await ctx.store.save(referendum)
}

export async function updatePreimage(ctx: ProcessorContext<Store>, hash: string, status: PreimageStatus, header: Block) {
    assert(header.timestamp, `Got an undefined timestamp at block ${header.height}`)
    const preimage = await ctx.store.get(Preimage, {
        where: {
            hash,
        },
        order: {
            id: 'DESC',
        },
    })

    if (!preimage) {
        ctx.log.warn(MissingPreimageWarn(hash))
        return
    }

    preimage.updatedAt = new Date(header.timestamp)
    preimage.updatedAtBlock = header.height
    preimage.status = status

    preimage.statusHistory.push(
        new PreimageStatusHistory({
            block: preimage.updatedAtBlock,
            timestamp: preimage.updatedAt,
            status: preimage.status,
        })
    )

    await ctx.store.save(preimage)
}
