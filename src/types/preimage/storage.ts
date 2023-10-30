import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v9160 from '../v9160'
import * as v9320 from '../v9320'

export const preimageFor =  {
    /**
     *  The preimages stored by this pallet.
     */
    v9160: new StorageType('Preimage.PreimageFor', 'Optional', [v9160.H256], v9160.BoundedVec) as PreimageForV9160,
    v9320: new StorageType('Preimage.PreimageFor', 'Optional', [sts.tuple(() => [v9320.H256, sts.number()])], sts.bytes()) as PreimageForV9320,
}

/**
 *  The preimages stored by this pallet.
 */
export interface PreimageForV9160  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9160.H256): Promise<(v9160.BoundedVec | undefined)>
    getMany(block: Block, keys: v9160.H256[]): Promise<(v9160.BoundedVec | undefined)[]>
    getKeys(block: Block): Promise<v9160.H256[]>
    getKeys(block: Block, key: v9160.H256): Promise<v9160.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9160.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9160.H256): AsyncIterable<v9160.H256[]>
    getPairs(block: Block): Promise<[k: v9160.H256, v: (v9160.BoundedVec | undefined)][]>
    getPairs(block: Block, key: v9160.H256): Promise<[k: v9160.H256, v: (v9160.BoundedVec | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9160.H256, v: (v9160.BoundedVec | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9160.H256): AsyncIterable<[k: v9160.H256, v: (v9160.BoundedVec | undefined)][]>
}

export interface PreimageForV9320  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: [v9320.H256, number]): Promise<(Bytes | undefined)>
    getMany(block: Block, keys: [v9320.H256, number][]): Promise<(Bytes | undefined)[]>
    getKeys(block: Block): Promise<[v9320.H256, number][]>
    getKeys(block: Block, key: [v9320.H256, number]): Promise<[v9320.H256, number][]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<[v9320.H256, number][]>
    getKeysPaged(pageSize: number, block: Block, key: [v9320.H256, number]): AsyncIterable<[v9320.H256, number][]>
    getPairs(block: Block): Promise<[k: [v9320.H256, number], v: (Bytes | undefined)][]>
    getPairs(block: Block, key: [v9320.H256, number]): Promise<[k: [v9320.H256, number], v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: [v9320.H256, number], v: (Bytes | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: [v9320.H256, number]): AsyncIterable<[k: [v9320.H256, number], v: (Bytes | undefined)][]>
}
