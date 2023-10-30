import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'
import * as v9130 from '../v9130'

export const proposed =  {
    name: 'TechnicalCommittee.Proposed',
    /**
     *  A motion (given hash) has been proposed (by given account) with a threshold (given
     *  `MemberCount`).
     */
    v1020: new EventType(
        'TechnicalCommittee.Proposed',
        sts.tuple([v1020.AccountId, v1020.ProposalIndex, v1020.Hash, v1020.MemberCount])
    ),
    /**
     * A motion (given hash) has been proposed (by given account) with a threshold (given
     * `MemberCount`).
     */
    v9130: new EventType(
        'TechnicalCommittee.Proposed',
        sts.struct({
            account: v9130.AccountId32,
            proposalIndex: sts.number(),
            proposalHash: v9130.H256,
            threshold: sts.number(),
        })
    ),
}

export const approved =  {
    name: 'TechnicalCommittee.Approved',
    /**
     *  A motion was approved by the required threshold.
     */
    v1020: new EventType(
        'TechnicalCommittee.Approved',
        v1020.Hash
    ),
    /**
     * A motion was approved by the required threshold.
     */
    v9130: new EventType(
        'TechnicalCommittee.Approved',
        sts.struct({
            proposalHash: v9130.H256,
        })
    ),
}
