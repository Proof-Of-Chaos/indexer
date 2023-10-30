import { Store } from '@subsquid/typeorm-store'
import { UnknownVersionError } from '../../../common/errors'
import { convictionToLockPeriod, isValueAddress } from './helpers'
import { ProcessorContext, Call } from '../../../processor'
import { calls, events } from '../../../types'
import { MultiAddress } from '../../../types/v9320'
import { decodeHex } from '@subsquid/substrate-processor'
import * as ss58 from '@subsquid/ss58'
import { NoValueOnMultiAddress } from './errors'

type DemocracyVote =
    | {
        type: 'Standard'
        balance?: bigint
        value: number
    }
    | {
        type: 'SplitAbstain'
        aye: bigint
        nay: bigint
        abstain: bigint
    }
    | {
        type: 'Split'
        aye: bigint
        nay: bigint
    }

interface ConvictionVotingVoteCallData {
    index: number
    vote: DemocracyVote
}

export function getVoteData(ctx: ProcessorContext<Store>, itemCall: Call): ConvictionVotingVoteCallData {
    const event = calls.convictionVoting.vote

    if (event.v9320.is(itemCall)) {
        const { pollIndex, vote } = event.v9320.decode(itemCall)
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
    else if (event.v9340.is(itemCall)) {
        const { pollIndex, vote } = event.v9340.decode(itemCall)
        if (vote.__kind === 'Standard') {
            return {
                index: pollIndex,
                vote: {
                    type: 'Standard',
                    value: vote.vote,
                    balance: vote.balance,
                },
            }
        } 
        else if (vote.__kind === 'SplitAbstain') {
            return {
                index: pollIndex,
                vote: {
                    type: 'SplitAbstain',
                    aye: vote.aye,
                    nay: vote.nay,
                    abstain: vote.abstain
                },
            }
        }
        else {
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
    to: MultiAddress
    lockPeriod: number
    balance?: bigint
}

export function getDelegateData(ctx: ProcessorContext<Store>, itemCall: Call): ConvictionVoteDelegateCallData {
    const event = calls.convictionVoting.delegate
   
    if (event.v9320.is(itemCall)) {
        //{ class, to, conviction, balance}
        const eventData = event.v9320.decode(itemCall)
        return {
            track: eventData.class,
            to: eventData.to,
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

export function getUndelegateData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVoteUndelegateCallData {
    const event = calls.convictionVoting.undelegate
   
    if (event.v9320.is(itemCall)) {
        const eventData = event.v9320.decode(itemCall)
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

export function getRemoveVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveVoteCallData {
    const event = calls.convictionVoting.removeVote
    if (event.v9320.is(itemCall)) {
        const eventData = event.v9320.decode(itemCall)
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
    target: string | undefined
}

export function getRemoveOtherVoteData(ctx: ProcessorContext<Store>, itemCall: any): ConvictionVotingRemoveOtherVoteCallData {
    const event = calls.convictionVoting.removeOtherVote
    if (event.v9320.is(itemCall)) {
        const eventData = event.v9320.decode(itemCall)
        let target;
        if (isValueAddress(eventData.target)) {
            target = ss58.codec('kusama').encode(decodeHex(eventData.target.value));
        } else {
            // Handle the case where to is a MultiAddress_Index, or add additional logic as needed.
            ctx.log.warn(NoValueOnMultiAddress(itemCall.block.height, eventData.class, eventData.target.__kind))
        }
        return {
            index: eventData.index,
            track: eventData.class,
            target: target
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}