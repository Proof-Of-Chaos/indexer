import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'

export const totalIssuance =  {
    /**
     *  The total units issued in the system.
     */
    v1020: new StorageType('Balances.TotalIssuance', 'Default', [], v1020.Balance) as TotalIssuanceV1020,
}

/**
 *  The total units issued in the system.
 */
export interface TotalIssuanceV1020  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1020.Balance
    get(block: Block): Promise<(v1020.Balance | undefined)>
}
