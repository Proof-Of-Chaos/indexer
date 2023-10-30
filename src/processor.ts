import { lookupArchive } from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    SubstrateBatchProcessor,
    SubstrateBatchProcessorFields,
    Event as _Event,
    Call as _Call,
    Extrinsic as _Extrinsic
} from '@subsquid/substrate-processor'
import { TypeormDatabase } from '@subsquid/typeorm-store'
import * as modules from './mappings'
import { calls, events } from './types'

const processor = new SubstrateBatchProcessor()
    .setDataSource({
        archive: lookupArchive('kusama', { release: 'ArrowSquid' }),
        chain: {
            url: 'wss://kusama-rpc.polkadot.io',
            rateLimit: 10
        }
    })
    .setBlockRange({ from: 17253843 })
    // .addCall({
    //     name: ['System.remark']
    // })
    // .addCall({
    //     name: ['Democracy.vote']
    // })
    // .addCall({
    //     name: ['Democracy.remove_vote']
    // })
    // .addCall({
    //     name: ['Democracy.remove_other_vote']
    // })
    // .addCall({
    //     name: ['Democracy.delegate'],
    // })
    // .addCall({
    //     name: ['Democracy.undelegate']
    // })
    .addCall({
        name: ['ConvictionVoting.vote']
    })
    .addCall({
        name: [calls.convictionVoting.delegate.name],
        extrinsic: true,
    })
    // .addCall({
    //     name: ['ConvictionVoting.undelegate']
    // })
    // .addCall({
    //     name: ['ConvictionVoting.remove_vote']
    // })
    // .addCall({
    //     name: ['ConvictionVoting.remove_other_vote']
    // })
    // .addEvent({
    //     name: ['Democracy.Proposed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.Started'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.Passed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.NotPassed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.Cancelled'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.Executed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.Tabled'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.PreimageNoted'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.PreimageUsed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.PreimageInvalid'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.PreimageMissing'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Democracy.PreimageReaped'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Council.Proposed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Council.Approved'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['TechnicalCommittee.Proposed'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['TechnicalCommittee.Approved'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['Session.NewSession'],
    //     call: true,
    //     extrinsic: true
    // })
    // .addEvent({
    //     name: ['PhragmenElection.NewTerm'],
    //     call: true,
    //     extrinsic: true
    // })
    .addEvent({
        name: ['Referenda.Submitted'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.DecisionStarted'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.Approved'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.Cancelled'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.Confirmed'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.Rejected'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.TimedOut'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.Killed'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.ConfirmAborted'],
        call: true,
        extrinsic: true
    })
    .addEvent({
        name: ['Referenda.ConfirmStarted'],
        call: true,
        extrinsic: true
    })
    .setFields({
        event: {},
        call: {
            origin: true,
            success: true,
            error: true,
        },
        extrinsic: {
            hash: true,
            fee: true,
            tip: true,
        },
        block: {
            timestamp: true
        }
    })

processor.run(new TypeormDatabase(), async (ctx) => {
    for (let block of ctx.blocks) {
        for (let call of block.calls) {
            // if (call.name == 'System.remark') {
            //     await modules.system.extrinsics.handleRemark(ctx, call, block.header)
            // }
            // if (call.name == 'Democracy.vote') {
            //     await modules.democracy.extrinsics.handleVote(ctx, call, block.header)
            // }
            // if (call.name == 'Democracy.remove_vote') {
            //     await modules.democracy.extrinsics.handleRemoveVote(ctx, call, block.header)
            // }
            // if (call.name == 'Democracy.remove_other_vote') {
            //     await modules.democracy.extrinsics.handleRemoveOtherVote(ctx, call, block.header)
            // }
            // if (call.name == 'Democracy.delegate') {
            //     await modules.democracy.extrinsics.handleDelegate(ctx, call, block.header)
            // }
            // if (call.name == 'Democracy.undelegate') {
            //     await modules.democracy.extrinsics.handleUndelegate(ctx, call, block.header)
            // }
            if (call.name == 'ConvictionVoting.vote') {
                await modules.convictionVoting.extrinsics.handleVote(ctx, call, block.header)
            }
            if (call.name == 'ConvictionVoting.delegate') {
                await modules.convictionVoting.extrinsics.handleDelegate(ctx, call, block.header)
            }
            // if (call.name == 'ConvictionVoting.undelegate') {
            //     await modules.convictionVoting.extrinsics.handleUndelegate(ctx, call, block.header)
            // }
            // if (call.name == 'ConvictionVoting.remove_vote') {
            //     await modules.convictionVoting.extrinsics.handleRemoveVote(ctx, call, block.header)
            // }
            // if (call.name == 'ConvictionVoting.remove_other_vote') {
            //     await modules.convictionVoting.extrinsics.handleRemoveOtherVote(ctx, call, block.header)
            // }
        }
        for (let event of block.events) {
            // if (event.name == 'Democracy.Proposed') {
            //     await modules.democracy.events.handleProposed(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.Started') {
            //     await modules.democracy.events.handleStarted(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.Passed') {
            //     await modules.democracy.events.handlePassed(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.NotPassed') {
            //     await modules.democracy.events.handleNotPassed(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.Cancelled') {
            //     await modules.democracy.events.handleCancelled(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.Executed') {
            //     await modules.democracy.events.handleExecuted(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.Tabled') {
            //     await modules.democracy.events.handleTabled(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.PreimageNoted') {
            //     await modules.democracy.events.handlePreimageNoted(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.PreimageUsed') {
            //     await modules.democracy.events.handlePreimageUsed(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.PreimageInvalid') {
            //     await modules.democracy.events.handlePreimageInvalid(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.PreimageMissing') {
            //     await modules.democracy.events.handlePreimageMissing(ctx, event, block.header)
            // }
            // if (event.name == 'Democracy.PreimageReaped') {
            //     await modules.democracy.events.handlePreimageReaped(ctx, event, block.header)
            // }
            // if (event.name == 'Council.Proposed') {
            //     await modules.council.events.handleProposed(ctx, event, block.header)
            // }
            // if (event.name == 'Council.Approved') {
            //     await modules.council.events.handleApproved(ctx, event, block.header)
            // }
            // if (event.name == 'TechnicalCommittee.Proposed') {
            //     await modules.techComittee.events.handleProposed(ctx, event, block.header)
            // }
            // if (event.name == 'TechnicalCommittee.Approved') {
            //     await modules.techComittee.events.handleApproved(ctx, event, block.header)
            // }
            // if (event.name == 'Session.NewSession') {
            //     await modules.session.events.handleNewSession(ctx, event, block.header)
            // }
            // if (event.name == 'PhragmenElection.NewTerm') {
            //     await modules.election.events.handleNewTerm(ctx, event, block.header)
            // }
            if (event.name == 'Referenda.Submitted') {
                await modules.referenda.events.handleSubmitted(ctx, event, block.header)
            }
            if (event.name == 'Referenda.DecisionStarted') {
                await modules.referenda.events.handleDecisionStarted(ctx, event, block.header)
            }
            // // if (event.name == 'Preimage.Noted') {
            // //     await modules.preimage.events.handleNoted(ctx, event, block.header)
            // // }
            if (event.name == 'Referenda.Approved') {
                await modules.referenda.events.handleApproved(ctx, event, block.header)
            }
            if (event.name == 'Referenda.Cancelled') {
                await modules.referenda.events.handleCancelled(ctx, event, block.header)
            }
            if (event.name == 'Referenda.Confirmed') {
                await modules.referenda.events.handleConfirmed(ctx, event, block.header)
            }
            if (event.name == 'Referenda.Rejected') {
                await modules.referenda.events.handleRejected(ctx, event, block.header)
            }
            if (event.name == 'Referenda.TimedOut') {
                await modules.referenda.events.handleTimedOut(ctx, event, block.header)
            }
            if (event.name == 'Referenda.Killed') {
                await modules.referenda.events.handleKilled(ctx, event, block.header)
            }
            if (event.name == 'Referenda.ConfirmStarted') {
                await modules.referenda.events.handleConfirmStarted(ctx, event, block.header)
            }
            if (event.name == 'Referenda.ConfirmAborted') {
                await modules.referenda.events.handleConfirmAborted(ctx, event, block.header)
            }
        }
    }
})

export type Fields = SubstrateBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Event = _Event<Fields>
export type Call = _Call<Fields>
export type Extrinsic = _Extrinsic<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>