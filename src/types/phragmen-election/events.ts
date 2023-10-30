import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v9010 from '../v9010'
import * as v9130 from '../v9130'

export const newTerm =  {
    name: 'PhragmenElection.NewTerm',
    /**
     *  A new term with \[new_members\]. This indicates that enough candidates existed to run
     *  the election, not that enough have has been elected. The inner value must be examined
     *  for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
     *  slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
     *  begin with.
     */
    v9010: new EventType(
        'PhragmenElection.NewTerm',
        sts.array(() => sts.tuple(() => [v9010.AccountId, v9010.Balance]))
    ),
    /**
     * A new term with new_members. This indicates that enough candidates existed to run
     * the election, not that enough have has been elected. The inner value must be examined
     * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
     * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
     * begin with.
     */
    v9130: new EventType(
        'PhragmenElection.NewTerm',
        sts.struct({
            newMembers: sts.array(() => sts.tuple(() => [v9130.AccountId32, sts.bigint()])),
        })
    ),
}
