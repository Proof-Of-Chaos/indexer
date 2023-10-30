import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'

export const validators =  {
    /**
     *  The current set of validators.
     */
    v1020: new StorageType('Session.Validators', 'Default', [], sts.array(() => v1020.ValidatorId)) as ValidatorsV1020,
}

/**
 *  The current set of validators.
 */
export interface ValidatorsV1020  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1020.ValidatorId[]
    get(block: Block): Promise<(v1020.ValidatorId[] | undefined)>
}

export const currentIndex =  {
    /**
     *  Current index of the session.
     */
    v1020: new StorageType('Session.CurrentIndex', 'Default', [], v1020.SessionIndex) as CurrentIndexV1020,
}

/**
 *  Current index of the session.
 */
export interface CurrentIndexV1020  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1020.SessionIndex
    get(block: Block): Promise<(v1020.SessionIndex | undefined)>
}
