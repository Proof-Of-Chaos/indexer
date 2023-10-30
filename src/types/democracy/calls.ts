import {sts, Block, Bytes, Option, Result, CallType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'
import * as v1055 from '../v1055'
import * as v9111 from '../v9111'
import * as v9291 from '../v9291'

export const vote =  {
    name: 'Democracy.vote',
    /**
     *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
     *  otherwise it is a vote to keep the status quo.
     * 
     *  # <weight>
     *  - O(1).
     *  - One DB change, one DB entry.
     *  # </weight>
     */
    v1020: new CallType(
        'Democracy.vote',
        sts.struct({
            refIndex: sts.number(),
            vote: v1020.Vote,
        })
    ),
    /**
     *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
     *  otherwise it is a vote to keep the status quo.
     * 
     *  The dispatch origin of this call must be _Signed_.
     * 
     *  - `ref_index`: The index of the referendum to vote for.
     *  - `vote`: The vote configuration.
     * 
     *  # <weight>
     *  - `O(1)`.
     *  - One DB change, one DB entry.
     *  # </weight>
     */
    v1055: new CallType(
        'Democracy.vote',
        sts.struct({
            refIndex: sts.number(),
            vote: v1055.AccountVote,
        })
    ),
    /**
     * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
     * otherwise it is a vote to keep the status quo.
     * 
     * The dispatch origin of this call must be _Signed_.
     * 
     * - `ref_index`: The index of the referendum to vote for.
     * - `vote`: The vote configuration.
     * 
     * Weight: `O(R)` where R is the number of referendums the voter has voted on.
     */
    v9111: new CallType(
        'Democracy.vote',
        sts.struct({
            refIndex: sts.number(),
            vote: v9111.AccountVote,
        })
    ),
}

export const delegate =  {
    name: 'Democracy.delegate',
    /**
     *  Delegate vote.
     * 
     *  # <weight>
     *  - One extra DB entry.
     *  # </weight>
     */
    v1020: new CallType(
        'Democracy.delegate',
        sts.struct({
            to: v1020.AccountId,
            conviction: v1020.Conviction,
        })
    ),
    /**
     *  Delegate the voting power (with some given conviction) of the sending account.
     * 
     *  The balance delegated is locked for as long as it's delegated, and thereafter for the
     *  time appropriate for the conviction's lock period.
     * 
     *  The dispatch origin of this call must be _Signed_, and the signing account must either:
     *    - be delegating already; or
     *    - have no voting activity (if there is, then it will need to be removed/consolidated
     *      through `reap_vote` or `unvote`).
     * 
     *  - `to`: The account whose voting the `target` account's voting power will follow.
     *  - `conviction`: The conviction that will be attached to the delegated votes. When the
     *    account is undelegated, the funds will be locked for the corresponding period.
     *  - `balance`: The amount of the account's balance to be used in delegating. This must
     *    not be more than the account's current balance.
     * 
     *  Emits `Delegated`.
     * 
     *  # <weight>
     *  # </weight>
     */
    v1055: new CallType(
        'Democracy.delegate',
        sts.struct({
            to: v1055.AccountId,
            conviction: v1055.Conviction,
            balance: v1055.BalanceOf,
        })
    ),
    /**
     * Delegate the voting power (with some given conviction) of the sending account.
     * 
     * The balance delegated is locked for as long as it's delegated, and thereafter for the
     * time appropriate for the conviction's lock period.
     * 
     * The dispatch origin of this call must be _Signed_, and the signing account must either:
     *   - be delegating already; or
     *   - have no voting activity (if there is, then it will need to be removed/consolidated
     *     through `reap_vote` or `unvote`).
     * 
     * - `to`: The account whose voting the `target` account's voting power will follow.
     * - `conviction`: The conviction that will be attached to the delegated votes. When the
     *   account is undelegated, the funds will be locked for the corresponding period.
     * - `balance`: The amount of the account's balance to be used in delegating. This must not
     *   be more than the account's current balance.
     * 
     * Emits `Delegated`.
     * 
     * Weight: `O(R)` where R is the number of referendums the voter delegating to has
     *   voted on. Weight is charged as if maximum votes.
     */
    v9291: new CallType(
        'Democracy.delegate',
        sts.struct({
            to: v9291.MultiAddress,
            conviction: v9291.Conviction,
            balance: sts.bigint(),
        })
    ),
}

export const undelegate =  {
    name: 'Democracy.undelegate',
    /**
     *  Undelegate vote.
     * 
     *  # <weight>
     *  - O(1).
     *  # </weight>
     */
    v1020: new CallType(
        'Democracy.undelegate',
        sts.unit()
    ),
}

export const removeVote =  {
    name: 'Democracy.remove_vote',
    /**
     *  Remove a vote for a referendum.
     * 
     *  If:
     *  - the referendum was cancelled, or
     *  - the referendum is ongoing, or
     *  - the referendum has ended such that
     *    - the vote of the account was in opposition to the result; or
     *    - there was no conviction to the account's vote; or
     *    - the account made a split vote
     *  ...then the vote is removed cleanly and a following call to `unlock` may result in more
     *  funds being available.
     * 
     *  If, however, the referendum has ended and:
     *  - it finished corresponding to the vote of the account, and
     *  - the account made a standard vote with conviction, and
     *  - the lock period of the conviction is not over
     *  ...then the lock will be aggregated into the overall account's lock, which may involve
     *  *overlocking* (where the two locks are combined into a single lock that is the maximum
     *  of both the amount locked and the time is it locked for).
     * 
     *  The dispatch origin of this call must be _Signed_, and the signer must have a vote
     *  registered for referendum `index`.
     * 
     *  - `index`: The index of referendum of the vote to be removed.
     * 
     *  # <weight>
     *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
     *  # </weight>
     */
    v1055: new CallType(
        'Democracy.remove_vote',
        sts.struct({
            index: v1055.ReferendumIndex,
        })
    ),
}

export const removeOtherVote =  {
    name: 'Democracy.remove_other_vote',
    /**
     *  Remove a vote for a referendum.
     * 
     *  If the `target` is equal to the signer, then this function is exactly equivalent to
     *  `remove_vote`. If not equal to the signer, then the vote must have expired,
     *  either because the referendum was cancelled, because the voter lost the referendum or
     *  because the conviction period is over.
     * 
     *  The dispatch origin of this call must be _Signed_.
     * 
     *  - `target`: The account of the vote to be removed; this account must have voted for
     *    referendum `index`.
     *  - `index`: The index of referendum of the vote to be removed.
     * 
     *  # <weight>
     *  - `O(R + log R)` where R is the number of referenda that `target` has voted on.
     *  # </weight>
     */
    v1055: new CallType(
        'Democracy.remove_other_vote',
        sts.struct({
            target: v1055.AccountId,
            index: v1055.ReferendumIndex,
        })
    ),
    /**
     * Remove a vote for a referendum.
     * 
     * If the `target` is equal to the signer, then this function is exactly equivalent to
     * `remove_vote`. If not equal to the signer, then the vote must have expired,
     * either because the referendum was cancelled, because the voter lost the referendum or
     * because the conviction period is over.
     * 
     * The dispatch origin of this call must be _Signed_.
     * 
     * - `target`: The account of the vote to be removed; this account must have voted for
     *   referendum `index`.
     * - `index`: The index of referendum of the vote to be removed.
     * 
     * Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
     *   Weight is calculated for the maximum number of vote.
     */
    v9291: new CallType(
        'Democracy.remove_other_vote',
        sts.struct({
            target: v9291.MultiAddress,
            index: sts.number(),
        })
    ),
}
