/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ss58 from '@subsquid/ss58'
import { Chain } from '@subsquid/substrate-processor/lib/chain'
import { Parser } from './parser'
import { Codec } from '@subsquid/scale-codec'
import { decodeHex } from '@subsquid/util-internal-hex'
import { Block } from '../processor'

export const ss58codec = ss58.codec('kusama')

interface Call {
    __kind: string
    value: any
}

export function parseProposalCall(block: Block, data: Call) {
    const section = data.__kind
    const {__kind: method, ...args} = data.value

    const name = `${section}.${method}`

    const description = (block._runtime.calls.get(name).docs as string[]).join('\n')

    // const codec = block._runtime.scaleCodec

    // const args = new Parser((codec as any).types).parse(chain.description.call, data)

    return {
        section,
        method,
        description,
        args,
    }
}

export function encodeId(id: string | Uint8Array) {
    return ss58codec.encode(typeof id === 'string' ? decodeHex(id) : id)
}

export function decodeId(id: string) {
    return ss58codec.decode(id)
}

export function getOriginAccountId(origin: any) {
    // eslint-disable-next-line sonarjs/no-small-switch
    if (!origin) return undefined
    switch (origin.__kind) {
        case 'system':
            // eslint-disable-next-line sonarjs/no-nested-switch, sonarjs/no-small-switch
            switch (origin.value.__kind) {
                case 'Signed':
                    let accountID
                    try {
                        // origin.value:
                        // {
                        //     __kind: 'Signed',
                        //     value: '0x988740c0cb624d6228e22704f9dddd8a526775c81506cb9eab96d3be870d4a04'
                        // }
                        accountID = ss58codec.encode(decodeHex(origin.value.value))
                    } catch (e) {
                        // origin.value:
                        // {
                        //     __kind: 'Signed',
                        //     value: {
                        //         __kind: 'Id',
                        //         value: '0x988740c0cb624d6228e22704f9dddd8a526775c81506cb9eab96d3be870d4a04'
                        //     }
                        // }
                        accountID = ss58codec.encode(decodeHex(origin.value.value.value))
                    }
                    return accountID
                default:
                    return undefined
            }
        default:
            return undefined
    }
}
