import { Store } from '@subsquid/typeorm-store'
import { getPreimageData } from '../../storage/preimage'
import { parseProposalCall } from '../../common/tools'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { Block, ProcessorContext } from '../../processor'
import { toHex } from '@subsquid/substrate-processor'

function decodeProposal(block: Block, data: string) {
    return block._runtime.scaleCodec.decodeBinary(block._runtime.description.call, data)
    // @ts-ignore
    // return chain.scaleCodec.decodeBinary(chain.rpc.call, data)
}

export async function getPreimageProposalCall(ctx: ProcessorContext<Store>, hash: string, len: number | undefined, block: Block) {
    if (!len) return
    const preimageData = await getPreimageData(ctx, hash, len, block)
    if (!preimageData) return
    let decodedCall:
        | {
            section: string
            method: string
            description: string
            args: Record<string, unknown>
        }
        | undefined

    // const hexHash = toHex(hash)

    try {
        const preimage = decodeProposal(block, preimageData.data)
        decodedCall = parseProposalCall(block, preimage)
        return decodedCall
    } catch (e) {
        ctx.log.warn(`Failed to decode ProposedCall of Preimage ${hash} at block ${block.height}:\n ${e}`)
    }
}