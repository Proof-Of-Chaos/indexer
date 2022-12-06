import { BatchContext } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import {
    ConvictionVotingVoteCall,
    ConvictionVotingDelegateCall,
    ConvictionVotingUndelegateCall,
    ConvictionVotingRemoveVoteCall,
    ConvictionVotingRemoveOtherVoteCall
} from '../../../types/calls'
import { Event } from '../../../types/support'
import { convictionToLockPeriod } from './helpers'

type DemocracyVote =
    | {
        type: 'Standard'
        balance?: bigint
        value: number
    }
    | {
        type: 'Split'
        aye: bigint
        nay: bigint
    }

interface DemocracyVoteCallData {
    index: number
    vote: DemocracyVote
}

export function getVoteData(ctx: BatchContext<Store, unknown>, itemCall: any): DemocracyVoteCallData {
    const event = new ConvictionVotingVoteCall(ctx, itemCall)

    if (event.isV9320) {
        const { pollIndex, vote } = event.asV9320
        if (vote.__kind === 'Standard') {
            return {
                index: pollIndex,
                vote: {
                    type: 'Standard',
                    value: vote.vote,
                    balance: vote.balance,
                },
            }
        } else {
            return {
                index: pollIndex,
                vote: {
                    type: 'Split',
                    aye: vote.aye,
                    nay: vote.nay,
                },
            }
        }
    }
    else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConvictionVoteDelegateCallData {
    track: number
    to: any
    lockPeriod: number
    balance?: bigint
}

export function getDelegateData(ctx: BatchContext<Store, unknown>, itemCall: any): ConvictionVoteDelegateCallData {
    const event = new ConvictionVotingDelegateCall(ctx, itemCall)
   
    if (event.isV9320) {
        //{ class, to, conviction, balance}
        const eventData = event.asV9320
        return {
            track: eventData.class,
            to: eventData.to.value,
            lockPeriod: convictionToLockPeriod(eventData.conviction.__kind),
            balance: eventData.balance
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConvictionVoteUndelegateCallData {
    track: number
}

export function getUndelegateData(ctx: BatchContext<Store, unknown>, itemCall: any): ConvictionVoteUndelegateCallData {
    const event = new ConvictionVotingUndelegateCall(ctx, itemCall)
   
    if (event.isV9320) {
        const eventData = event.asV9320
        return {
            track: eventData.class
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConvictionVotingRemoveVoteCallData {
    index: number
    track: number | undefined
}

export function getRemoveVoteData(ctx: BatchContext<Store, unknown>, itemCall: any): ConvictionVotingRemoveVoteCallData {
    const event = new ConvictionVotingRemoveVoteCall(ctx, itemCall)
    if (event.isV9320) {
        const eventData = event.asV9320
        return {
            index: eventData.index,
            track: eventData.class
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export interface ConvictionVotingRemoveOtherVoteCallData {
    index: number
    track: number | undefined
    target: Uint8Array | null
}

export function getRemoveOtherVoteData(ctx: BatchContext<Store, unknown>, itemCall: any): ConvictionVotingRemoveOtherVoteCallData {
    const event = new ConvictionVotingRemoveOtherVoteCall(ctx, itemCall)
    if (event.isV9320) {
        const eventData = event.asV9320
        return {
            index: eventData.index,
            track: eventData.class,
            target: eventData.target.value
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}