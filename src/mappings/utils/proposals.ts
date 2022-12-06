import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
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
import { BalancesTotalIssuanceStorage } from '../../types/storage'
import { MissingPreimageWarn, MissingReferendumWarn } from './errors'

export async function updateReferendum(ctx: BatchContext<Store, unknown>, index: number, status: ReferendumStatus, header: SubstrateBlock, totalIssuance?: string) {
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
    referendum.totalIssuance = await new BalancesTotalIssuanceStorage(ctx, header).asV1020.get() || 0n

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

export async function updateOpenGovReferendum(ctx: BatchContext<Store, unknown>, index: number, status: OpenGovReferendumStatus, header: SubstrateBlock, ayes?: bigint, nays?: bigint, support?: bigint, totalIssuance?: string) {
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
    referendum.totalIssuance = await new BalancesTotalIssuanceStorage(ctx, header).asV1020.get() || 0n
    referendum.ayes = ayes ? ayes : referendum.ayes 
    referendum.nays = nays ? nays : referendum.nays 
    referendum.support = support ? support : referendum.support 

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

export async function updatePreimage(ctx: BatchContext<Store, unknown>, hash: string, status: PreimageStatus, block: SubstrateBlock) {
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

    preimage.updatedAt = new Date(block.timestamp)
    preimage.updatedAtBlock = block.height
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
