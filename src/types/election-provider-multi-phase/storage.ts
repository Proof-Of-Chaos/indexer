import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v2029 from '../v2029'

export const currentPhase =  {
    /**
     *  Current phase.
     */
    v2029: new StorageType('ElectionProviderMultiPhase.CurrentPhase', 'Default', [], v2029.ElectionPhase) as CurrentPhaseV2029,
}

/**
 *  Current phase.
 */
export interface CurrentPhaseV2029  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v2029.ElectionPhase
    get(block: Block): Promise<(v2029.ElectionPhase | undefined)>
}
