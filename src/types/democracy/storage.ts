import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'
import * as v1022 from '../v1022'
import * as v1055 from '../v1055'
import * as v1058 from '../v1058'
import * as v9111 from '../v9111'
import * as v9320 from '../v9320'

export const publicPropCount =  {
    /**
     *  The number of (public) proposals that have been made so far.
     */
    v1020: new StorageType('Democracy.PublicPropCount', 'Default', [], v1020.PropIndex) as PublicPropCountV1020,
}

/**
 *  The number of (public) proposals that have been made so far.
 */
export interface PublicPropCountV1020  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): v1020.PropIndex
    get(block: Block): Promise<(v1020.PropIndex | undefined)>
}

export const publicProps =  {
    /**
     *  The public proposals. Unsorted.
     */
    v1020: new StorageType('Democracy.PublicProps', 'Default', [], sts.array(() => sts.tuple(() => [v1020.PropIndex, v1020.Proposal, v1020.AccountId]))) as PublicPropsV1020,
    /**
     *  The public proposals. Unsorted. The second item is the proposal's hash.
     */
    v1022: new StorageType('Democracy.PublicProps', 'Default', [], sts.array(() => sts.tuple(() => [v1022.PropIndex, v1022.Hash, v1022.AccountId]))) as PublicPropsV1022,
    /**
     *  The public proposals. Unsorted. The second item is the proposal.
     */
    v9320: new StorageType('Democracy.PublicProps', 'Default', [], sts.array(() => sts.tuple(() => [sts.number(), v9320.Bounded, v9320.AccountId32]))) as PublicPropsV9320,
}

/**
 *  The public proposals. Unsorted.
 */
export interface PublicPropsV1020  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [v1020.PropIndex, v1020.Proposal, v1020.AccountId][]
    get(block: Block): Promise<([v1020.PropIndex, v1020.Proposal, v1020.AccountId][] | undefined)>
}

/**
 *  The public proposals. Unsorted. The second item is the proposal's hash.
 */
export interface PublicPropsV1022  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [v1022.PropIndex, v1022.Hash, v1022.AccountId][]
    get(block: Block): Promise<([v1022.PropIndex, v1022.Hash, v1022.AccountId][] | undefined)>
}

/**
 *  The public proposals. Unsorted. The second item is the proposal.
 */
export interface PublicPropsV9320  {
    is(block: RuntimeCtx): boolean
    getDefault(block: Block): [number, v9320.Bounded, v9320.AccountId32][]
    get(block: Block): Promise<([number, v9320.Bounded, v9320.AccountId32][] | undefined)>
}

export const referendumInfoOf =  {
    /**
     *  Information concerning any given referendum.
     */
    v1020: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [v1020.ReferendumIndex], v1020.Type_283) as ReferendumInfoOfV1020,
    /**
     *  Information concerning any given referendum.
     */
    v1055: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [v1055.ReferendumIndex], v1055.ReferendumInfo) as ReferendumInfoOfV1055,
    /**
     *  Information concerning any given referendum.
     * 
     *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
     */
    v9111: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [sts.number()], v9111.ReferendumInfo) as ReferendumInfoOfV9111,
    /**
     *  Information concerning any given referendum.
     * 
     *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
     */
    v9320: new StorageType('Democracy.ReferendumInfoOf', 'Optional', [sts.number()], v9320.ReferendumInfo) as ReferendumInfoOfV9320,
}

/**
 *  Information concerning any given referendum.
 */
export interface ReferendumInfoOfV1020  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1020.ReferendumIndex): Promise<(v1020.Type_283 | undefined)>
    getMany(block: Block, keys: v1020.ReferendumIndex[]): Promise<(v1020.Type_283 | undefined)[]>
}

/**
 *  Information concerning any given referendum.
 */
export interface ReferendumInfoOfV1055  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1055.ReferendumIndex): Promise<(v1055.ReferendumInfo | undefined)>
    getMany(block: Block, keys: v1055.ReferendumIndex[]): Promise<(v1055.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<v1055.ReferendumIndex[]>
    getKeys(block: Block, key: v1055.ReferendumIndex): Promise<v1055.ReferendumIndex[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1055.ReferendumIndex[]>
    getKeysPaged(pageSize: number, block: Block, key: v1055.ReferendumIndex): AsyncIterable<v1055.ReferendumIndex[]>
    getPairs(block: Block): Promise<[k: v1055.ReferendumIndex, v: (v1055.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: v1055.ReferendumIndex): Promise<[k: v1055.ReferendumIndex, v: (v1055.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1055.ReferendumIndex, v: (v1055.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1055.ReferendumIndex): AsyncIterable<[k: v1055.ReferendumIndex, v: (v1055.ReferendumInfo | undefined)][]>
}

/**
 *  Information concerning any given referendum.
 * 
 *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
 */
export interface ReferendumInfoOfV9111  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v9111.ReferendumInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v9111.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v9111.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v9111.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v9111.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v9111.ReferendumInfo | undefined)][]>
}

/**
 *  Information concerning any given referendum.
 * 
 *  TWOX-NOTE: SAFE as indexes are not under an attacker’s control.
 */
export interface ReferendumInfoOfV9320  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: number): Promise<(v9320.ReferendumInfo | undefined)>
    getMany(block: Block, keys: number[]): Promise<(v9320.ReferendumInfo | undefined)[]>
    getKeys(block: Block): Promise<number[]>
    getKeys(block: Block, key: number): Promise<number[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<number[]>
    getKeysPaged(pageSize: number, block: Block, key: number): AsyncIterable<number[]>
    getPairs(block: Block): Promise<[k: number, v: (v9320.ReferendumInfo | undefined)][]>
    getPairs(block: Block, key: number): Promise<[k: number, v: (v9320.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: number, v: (v9320.ReferendumInfo | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: number): AsyncIterable<[k: number, v: (v9320.ReferendumInfo | undefined)][]>
}

export const preimages =  {
    /**
     *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
     *  The block number is the block at which it was deposited.
     */
    v1022: new StorageType('Democracy.Preimages', 'Optional', [v1022.Hash], sts.tuple(() => [sts.bytes(), v1022.AccountId, v1022.BalanceOf, v1022.BlockNumber])) as PreimagesV1022,
    /**
     *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
     *  The block number is the block at which it was deposited.
     */
    v1058: new StorageType('Democracy.Preimages', 'Optional', [v1058.Hash], v1058.PreimageStatus) as PreimagesV1058,
    /**
     *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
     *  The block number is the block at which it was deposited.
     */
    v9111: new StorageType('Democracy.Preimages', 'Optional', [v9111.H256], v9111.PreimageStatus) as PreimagesV9111,
}

/**
 *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
 *  The block number is the block at which it was deposited.
 */
export interface PreimagesV1022  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1022.Hash): Promise<([Bytes, v1022.AccountId, v1022.BalanceOf, v1022.BlockNumber] | undefined)>
    getMany(block: Block, keys: v1022.Hash[]): Promise<([Bytes, v1022.AccountId, v1022.BalanceOf, v1022.BlockNumber] | undefined)[]>
}

/**
 *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
 *  The block number is the block at which it was deposited.
 */
export interface PreimagesV1058  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1058.Hash): Promise<(v1058.PreimageStatus | undefined)>
    getMany(block: Block, keys: v1058.Hash[]): Promise<(v1058.PreimageStatus | undefined)[]>
    getKeys(block: Block): Promise<v1058.Hash[]>
    getKeys(block: Block, key: v1058.Hash): Promise<v1058.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1058.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v1058.Hash): AsyncIterable<v1058.Hash[]>
    getPairs(block: Block): Promise<[k: v1058.Hash, v: (v1058.PreimageStatus | undefined)][]>
    getPairs(block: Block, key: v1058.Hash): Promise<[k: v1058.Hash, v: (v1058.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1058.Hash, v: (v1058.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1058.Hash): AsyncIterable<[k: v1058.Hash, v: (v1058.PreimageStatus | undefined)][]>
}

/**
 *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
 *  The block number is the block at which it was deposited.
 */
export interface PreimagesV9111  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9111.H256): Promise<(v9111.PreimageStatus | undefined)>
    getMany(block: Block, keys: v9111.H256[]): Promise<(v9111.PreimageStatus | undefined)[]>
    getKeys(block: Block): Promise<v9111.H256[]>
    getKeys(block: Block, key: v9111.H256): Promise<v9111.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9111.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9111.H256): AsyncIterable<v9111.H256[]>
    getPairs(block: Block): Promise<[k: v9111.H256, v: (v9111.PreimageStatus | undefined)][]>
    getPairs(block: Block, key: v9111.H256): Promise<[k: v9111.H256, v: (v9111.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9111.H256, v: (v9111.PreimageStatus | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9111.H256): AsyncIterable<[k: v9111.H256, v: (v9111.PreimageStatus | undefined)][]>
}
