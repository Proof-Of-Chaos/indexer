import {sts, Block, Bytes, Option, Result, StorageType, RuntimeCtx} from '../support'
import * as v1020 from '../v1020'
import * as v1022 from '../v1022'
import * as v1024 from '../v1024'
import * as v1027 from '../v1027'
import * as v1029 from '../v1029'
import * as v1030 from '../v1030'
import * as v1031 from '../v1031'
import * as v1032 from '../v1032'
import * as v1038 from '../v1038'
import * as v1040 from '../v1040'
import * as v1042 from '../v1042'
import * as v1050 from '../v1050'
import * as v1054 from '../v1054'
import * as v1055 from '../v1055'
import * as v1058 from '../v1058'
import * as v1062 from '../v1062'
import * as v2005 from '../v2005'
import * as v2007 from '../v2007'
import * as v2011 from '../v2011'
import * as v2013 from '../v2013'
import * as v2015 from '../v2015'
import * as v2022 from '../v2022'
import * as v2023 from '../v2023'
import * as v2024 from '../v2024'
import * as v2025 from '../v2025'
import * as v2026 from '../v2026'
import * as v2028 from '../v2028'
import * as v2029 from '../v2029'
import * as v2030 from '../v2030'
import * as v9010 from '../v9010'
import * as v9030 from '../v9030'
import * as v9040 from '../v9040'
import * as v9050 from '../v9050'
import * as v9080 from '../v9080'
import * as v9090 from '../v9090'
import * as v9100 from '../v9100'
import * as v9111 from '../v9111'
import * as v9122 from '../v9122'
import * as v9130 from '../v9130'
import * as v9160 from '../v9160'
import * as v9170 from '../v9170'
import * as v9180 from '../v9180'
import * as v9190 from '../v9190'
import * as v9220 from '../v9220'
import * as v9230 from '../v9230'
import * as v9250 from '../v9250'
import * as v9271 from '../v9271'
import * as v9291 from '../v9291'
import * as v9300 from '../v9300'
import * as v9320 from '../v9320'
import * as v9340 from '../v9340'
import * as v9350 from '../v9350'
import * as v9370 from '../v9370'
import * as v9381 from '../v9381'

export const proposalOf =  {
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1020: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1020.Hash], v1020.Proposal) as ProposalOfV1020,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1022: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1022.Hash], v1022.Proposal) as ProposalOfV1022,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1024: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1024.Hash], v1024.Proposal) as ProposalOfV1024,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1027: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1027.Hash], v1027.Proposal) as ProposalOfV1027,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1029: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1029.Hash], v1029.Proposal) as ProposalOfV1029,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1030: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1030.Hash], v1030.Proposal) as ProposalOfV1030,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1031: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1031.Hash], v1031.Proposal) as ProposalOfV1031,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1032: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1032.Hash], v1032.Proposal) as ProposalOfV1032,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1038: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1038.Hash], v1038.Proposal) as ProposalOfV1038,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1040: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1040.Hash], v1040.Proposal) as ProposalOfV1040,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1042: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1042.Hash], v1042.Proposal) as ProposalOfV1042,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1050: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1050.Hash], v1050.Proposal) as ProposalOfV1050,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1054: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1054.Hash], v1054.Proposal) as ProposalOfV1054,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1055: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1055.Hash], v1055.Proposal) as ProposalOfV1055,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1058: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1058.Hash], v1058.Proposal) as ProposalOfV1058,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v1062: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v1062.Hash], v1062.Proposal) as ProposalOfV1062,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2005: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2005.Hash], v2005.Proposal) as ProposalOfV2005,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2007: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2007.Hash], v2007.Proposal) as ProposalOfV2007,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2011: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2011.Hash], v2011.Proposal) as ProposalOfV2011,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2013: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2013.Hash], v2013.Proposal) as ProposalOfV2013,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2015: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2015.Hash], v2015.Proposal) as ProposalOfV2015,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2022: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2022.Hash], v2022.Proposal) as ProposalOfV2022,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2023: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2023.Hash], v2023.Proposal) as ProposalOfV2023,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2024: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2024.Hash], v2024.Proposal) as ProposalOfV2024,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2025: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2025.Hash], v2025.Proposal) as ProposalOfV2025,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2026: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2026.Hash], v2026.Proposal) as ProposalOfV2026,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2028: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2028.Hash], v2028.Proposal) as ProposalOfV2028,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2029: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2029.Hash], v2029.Proposal) as ProposalOfV2029,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v2030: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v2030.Hash], v2030.Proposal) as ProposalOfV2030,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9010: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9010.Hash], v9010.Proposal) as ProposalOfV9010,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9030: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9030.Hash], v9030.Proposal) as ProposalOfV9030,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9040: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9040.Hash], v9040.Proposal) as ProposalOfV9040,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9050: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9050.Hash], v9050.Proposal) as ProposalOfV9050,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9080: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9080.Hash], v9080.Proposal) as ProposalOfV9080,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9090: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9090.Hash], v9090.Proposal) as ProposalOfV9090,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9100: new StorageType('Instance2Collective.ProposalOf', 'Optional', [v9100.Hash], v9100.Proposal) as ProposalOfV9100,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9111: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9111.H256], v9111.Call) as ProposalOfV9111,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9122: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9122.H256], v9122.Call) as ProposalOfV9122,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9130: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9130.H256], v9130.Call) as ProposalOfV9130,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9160: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9160.H256], v9160.Call) as ProposalOfV9160,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9170: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9170.H256], v9170.Call) as ProposalOfV9170,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9180: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9180.H256], v9180.Call) as ProposalOfV9180,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9190: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9190.H256], v9190.Call) as ProposalOfV9190,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9220: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9220.H256], v9220.Call) as ProposalOfV9220,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9230: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9230.H256], v9230.Call) as ProposalOfV9230,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9250: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9250.H256], v9250.Call) as ProposalOfV9250,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9271: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9271.H256], v9271.Call) as ProposalOfV9271,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9291: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9291.H256], v9291.Call) as ProposalOfV9291,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9300: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9300.H256], v9300.Call) as ProposalOfV9300,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9320: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9320.H256], v9320.Call) as ProposalOfV9320,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9340: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9340.H256], v9340.Call) as ProposalOfV9340,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9350: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9350.H256], v9350.Call) as ProposalOfV9350,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9370: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9370.H256], v9370.Call) as ProposalOfV9370,
    /**
     *  Actual proposal for a given hash, if it's current.
     */
    v9381: new StorageType('TechnicalCommittee.ProposalOf', 'Optional', [v9381.H256], v9381.Call) as ProposalOfV9381,
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1020  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1020.Hash): Promise<(v1020.Proposal | undefined)>
    getMany(block: Block, keys: v1020.Hash[]): Promise<(v1020.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1022  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1022.Hash): Promise<(v1022.Proposal | undefined)>
    getMany(block: Block, keys: v1022.Hash[]): Promise<(v1022.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1024  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1024.Hash): Promise<(v1024.Proposal | undefined)>
    getMany(block: Block, keys: v1024.Hash[]): Promise<(v1024.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1027  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1027.Hash): Promise<(v1027.Proposal | undefined)>
    getMany(block: Block, keys: v1027.Hash[]): Promise<(v1027.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1029  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1029.Hash): Promise<(v1029.Proposal | undefined)>
    getMany(block: Block, keys: v1029.Hash[]): Promise<(v1029.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1030  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1030.Hash): Promise<(v1030.Proposal | undefined)>
    getMany(block: Block, keys: v1030.Hash[]): Promise<(v1030.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1031  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1031.Hash): Promise<(v1031.Proposal | undefined)>
    getMany(block: Block, keys: v1031.Hash[]): Promise<(v1031.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1032  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1032.Hash): Promise<(v1032.Proposal | undefined)>
    getMany(block: Block, keys: v1032.Hash[]): Promise<(v1032.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1038  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1038.Hash): Promise<(v1038.Proposal | undefined)>
    getMany(block: Block, keys: v1038.Hash[]): Promise<(v1038.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1040  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1040.Hash): Promise<(v1040.Proposal | undefined)>
    getMany(block: Block, keys: v1040.Hash[]): Promise<(v1040.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1042  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1042.Hash): Promise<(v1042.Proposal | undefined)>
    getMany(block: Block, keys: v1042.Hash[]): Promise<(v1042.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1050  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1050.Hash): Promise<(v1050.Proposal | undefined)>
    getMany(block: Block, keys: v1050.Hash[]): Promise<(v1050.Proposal | undefined)[]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1054  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1054.Hash): Promise<(v1054.Proposal | undefined)>
    getMany(block: Block, keys: v1054.Hash[]): Promise<(v1054.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v1054.Hash[]>
    getKeys(block: Block, key: v1054.Hash): Promise<v1054.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1054.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v1054.Hash): AsyncIterable<v1054.Hash[]>
    getPairs(block: Block): Promise<[k: v1054.Hash, v: (v1054.Proposal | undefined)][]>
    getPairs(block: Block, key: v1054.Hash): Promise<[k: v1054.Hash, v: (v1054.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1054.Hash, v: (v1054.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1054.Hash): AsyncIterable<[k: v1054.Hash, v: (v1054.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1055  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1055.Hash): Promise<(v1055.Proposal | undefined)>
    getMany(block: Block, keys: v1055.Hash[]): Promise<(v1055.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v1055.Hash[]>
    getKeys(block: Block, key: v1055.Hash): Promise<v1055.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1055.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v1055.Hash): AsyncIterable<v1055.Hash[]>
    getPairs(block: Block): Promise<[k: v1055.Hash, v: (v1055.Proposal | undefined)][]>
    getPairs(block: Block, key: v1055.Hash): Promise<[k: v1055.Hash, v: (v1055.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1055.Hash, v: (v1055.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1055.Hash): AsyncIterable<[k: v1055.Hash, v: (v1055.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1058  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1058.Hash): Promise<(v1058.Proposal | undefined)>
    getMany(block: Block, keys: v1058.Hash[]): Promise<(v1058.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v1058.Hash[]>
    getKeys(block: Block, key: v1058.Hash): Promise<v1058.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1058.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v1058.Hash): AsyncIterable<v1058.Hash[]>
    getPairs(block: Block): Promise<[k: v1058.Hash, v: (v1058.Proposal | undefined)][]>
    getPairs(block: Block, key: v1058.Hash): Promise<[k: v1058.Hash, v: (v1058.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1058.Hash, v: (v1058.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1058.Hash): AsyncIterable<[k: v1058.Hash, v: (v1058.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV1062  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v1062.Hash): Promise<(v1062.Proposal | undefined)>
    getMany(block: Block, keys: v1062.Hash[]): Promise<(v1062.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v1062.Hash[]>
    getKeys(block: Block, key: v1062.Hash): Promise<v1062.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v1062.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v1062.Hash): AsyncIterable<v1062.Hash[]>
    getPairs(block: Block): Promise<[k: v1062.Hash, v: (v1062.Proposal | undefined)][]>
    getPairs(block: Block, key: v1062.Hash): Promise<[k: v1062.Hash, v: (v1062.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v1062.Hash, v: (v1062.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v1062.Hash): AsyncIterable<[k: v1062.Hash, v: (v1062.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2005  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2005.Hash): Promise<(v2005.Proposal | undefined)>
    getMany(block: Block, keys: v2005.Hash[]): Promise<(v2005.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2005.Hash[]>
    getKeys(block: Block, key: v2005.Hash): Promise<v2005.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2005.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2005.Hash): AsyncIterable<v2005.Hash[]>
    getPairs(block: Block): Promise<[k: v2005.Hash, v: (v2005.Proposal | undefined)][]>
    getPairs(block: Block, key: v2005.Hash): Promise<[k: v2005.Hash, v: (v2005.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2005.Hash, v: (v2005.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2005.Hash): AsyncIterable<[k: v2005.Hash, v: (v2005.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2007  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2007.Hash): Promise<(v2007.Proposal | undefined)>
    getMany(block: Block, keys: v2007.Hash[]): Promise<(v2007.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2007.Hash[]>
    getKeys(block: Block, key: v2007.Hash): Promise<v2007.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2007.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2007.Hash): AsyncIterable<v2007.Hash[]>
    getPairs(block: Block): Promise<[k: v2007.Hash, v: (v2007.Proposal | undefined)][]>
    getPairs(block: Block, key: v2007.Hash): Promise<[k: v2007.Hash, v: (v2007.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2007.Hash, v: (v2007.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2007.Hash): AsyncIterable<[k: v2007.Hash, v: (v2007.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2011  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2011.Hash): Promise<(v2011.Proposal | undefined)>
    getMany(block: Block, keys: v2011.Hash[]): Promise<(v2011.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2011.Hash[]>
    getKeys(block: Block, key: v2011.Hash): Promise<v2011.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2011.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2011.Hash): AsyncIterable<v2011.Hash[]>
    getPairs(block: Block): Promise<[k: v2011.Hash, v: (v2011.Proposal | undefined)][]>
    getPairs(block: Block, key: v2011.Hash): Promise<[k: v2011.Hash, v: (v2011.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2011.Hash, v: (v2011.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2011.Hash): AsyncIterable<[k: v2011.Hash, v: (v2011.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2013  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2013.Hash): Promise<(v2013.Proposal | undefined)>
    getMany(block: Block, keys: v2013.Hash[]): Promise<(v2013.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2013.Hash[]>
    getKeys(block: Block, key: v2013.Hash): Promise<v2013.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2013.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2013.Hash): AsyncIterable<v2013.Hash[]>
    getPairs(block: Block): Promise<[k: v2013.Hash, v: (v2013.Proposal | undefined)][]>
    getPairs(block: Block, key: v2013.Hash): Promise<[k: v2013.Hash, v: (v2013.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2013.Hash, v: (v2013.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2013.Hash): AsyncIterable<[k: v2013.Hash, v: (v2013.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2015  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2015.Hash): Promise<(v2015.Proposal | undefined)>
    getMany(block: Block, keys: v2015.Hash[]): Promise<(v2015.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2015.Hash[]>
    getKeys(block: Block, key: v2015.Hash): Promise<v2015.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2015.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2015.Hash): AsyncIterable<v2015.Hash[]>
    getPairs(block: Block): Promise<[k: v2015.Hash, v: (v2015.Proposal | undefined)][]>
    getPairs(block: Block, key: v2015.Hash): Promise<[k: v2015.Hash, v: (v2015.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2015.Hash, v: (v2015.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2015.Hash): AsyncIterable<[k: v2015.Hash, v: (v2015.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2022  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2022.Hash): Promise<(v2022.Proposal | undefined)>
    getMany(block: Block, keys: v2022.Hash[]): Promise<(v2022.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2022.Hash[]>
    getKeys(block: Block, key: v2022.Hash): Promise<v2022.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2022.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2022.Hash): AsyncIterable<v2022.Hash[]>
    getPairs(block: Block): Promise<[k: v2022.Hash, v: (v2022.Proposal | undefined)][]>
    getPairs(block: Block, key: v2022.Hash): Promise<[k: v2022.Hash, v: (v2022.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2022.Hash, v: (v2022.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2022.Hash): AsyncIterable<[k: v2022.Hash, v: (v2022.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2023  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2023.Hash): Promise<(v2023.Proposal | undefined)>
    getMany(block: Block, keys: v2023.Hash[]): Promise<(v2023.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2023.Hash[]>
    getKeys(block: Block, key: v2023.Hash): Promise<v2023.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2023.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2023.Hash): AsyncIterable<v2023.Hash[]>
    getPairs(block: Block): Promise<[k: v2023.Hash, v: (v2023.Proposal | undefined)][]>
    getPairs(block: Block, key: v2023.Hash): Promise<[k: v2023.Hash, v: (v2023.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2023.Hash, v: (v2023.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2023.Hash): AsyncIterable<[k: v2023.Hash, v: (v2023.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2024  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2024.Hash): Promise<(v2024.Proposal | undefined)>
    getMany(block: Block, keys: v2024.Hash[]): Promise<(v2024.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2024.Hash[]>
    getKeys(block: Block, key: v2024.Hash): Promise<v2024.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2024.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2024.Hash): AsyncIterable<v2024.Hash[]>
    getPairs(block: Block): Promise<[k: v2024.Hash, v: (v2024.Proposal | undefined)][]>
    getPairs(block: Block, key: v2024.Hash): Promise<[k: v2024.Hash, v: (v2024.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2024.Hash, v: (v2024.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2024.Hash): AsyncIterable<[k: v2024.Hash, v: (v2024.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2025  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2025.Hash): Promise<(v2025.Proposal | undefined)>
    getMany(block: Block, keys: v2025.Hash[]): Promise<(v2025.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2025.Hash[]>
    getKeys(block: Block, key: v2025.Hash): Promise<v2025.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2025.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2025.Hash): AsyncIterable<v2025.Hash[]>
    getPairs(block: Block): Promise<[k: v2025.Hash, v: (v2025.Proposal | undefined)][]>
    getPairs(block: Block, key: v2025.Hash): Promise<[k: v2025.Hash, v: (v2025.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2025.Hash, v: (v2025.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2025.Hash): AsyncIterable<[k: v2025.Hash, v: (v2025.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2026  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2026.Hash): Promise<(v2026.Proposal | undefined)>
    getMany(block: Block, keys: v2026.Hash[]): Promise<(v2026.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2026.Hash[]>
    getKeys(block: Block, key: v2026.Hash): Promise<v2026.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2026.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2026.Hash): AsyncIterable<v2026.Hash[]>
    getPairs(block: Block): Promise<[k: v2026.Hash, v: (v2026.Proposal | undefined)][]>
    getPairs(block: Block, key: v2026.Hash): Promise<[k: v2026.Hash, v: (v2026.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2026.Hash, v: (v2026.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2026.Hash): AsyncIterable<[k: v2026.Hash, v: (v2026.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2028  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2028.Hash): Promise<(v2028.Proposal | undefined)>
    getMany(block: Block, keys: v2028.Hash[]): Promise<(v2028.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2028.Hash[]>
    getKeys(block: Block, key: v2028.Hash): Promise<v2028.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2028.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2028.Hash): AsyncIterable<v2028.Hash[]>
    getPairs(block: Block): Promise<[k: v2028.Hash, v: (v2028.Proposal | undefined)][]>
    getPairs(block: Block, key: v2028.Hash): Promise<[k: v2028.Hash, v: (v2028.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2028.Hash, v: (v2028.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2028.Hash): AsyncIterable<[k: v2028.Hash, v: (v2028.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2029  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2029.Hash): Promise<(v2029.Proposal | undefined)>
    getMany(block: Block, keys: v2029.Hash[]): Promise<(v2029.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2029.Hash[]>
    getKeys(block: Block, key: v2029.Hash): Promise<v2029.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2029.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2029.Hash): AsyncIterable<v2029.Hash[]>
    getPairs(block: Block): Promise<[k: v2029.Hash, v: (v2029.Proposal | undefined)][]>
    getPairs(block: Block, key: v2029.Hash): Promise<[k: v2029.Hash, v: (v2029.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2029.Hash, v: (v2029.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2029.Hash): AsyncIterable<[k: v2029.Hash, v: (v2029.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV2030  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v2030.Hash): Promise<(v2030.Proposal | undefined)>
    getMany(block: Block, keys: v2030.Hash[]): Promise<(v2030.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v2030.Hash[]>
    getKeys(block: Block, key: v2030.Hash): Promise<v2030.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v2030.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v2030.Hash): AsyncIterable<v2030.Hash[]>
    getPairs(block: Block): Promise<[k: v2030.Hash, v: (v2030.Proposal | undefined)][]>
    getPairs(block: Block, key: v2030.Hash): Promise<[k: v2030.Hash, v: (v2030.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v2030.Hash, v: (v2030.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v2030.Hash): AsyncIterable<[k: v2030.Hash, v: (v2030.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9010  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9010.Hash): Promise<(v9010.Proposal | undefined)>
    getMany(block: Block, keys: v9010.Hash[]): Promise<(v9010.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9010.Hash[]>
    getKeys(block: Block, key: v9010.Hash): Promise<v9010.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9010.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9010.Hash): AsyncIterable<v9010.Hash[]>
    getPairs(block: Block): Promise<[k: v9010.Hash, v: (v9010.Proposal | undefined)][]>
    getPairs(block: Block, key: v9010.Hash): Promise<[k: v9010.Hash, v: (v9010.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9010.Hash, v: (v9010.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9010.Hash): AsyncIterable<[k: v9010.Hash, v: (v9010.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9030  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9030.Hash): Promise<(v9030.Proposal | undefined)>
    getMany(block: Block, keys: v9030.Hash[]): Promise<(v9030.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9030.Hash[]>
    getKeys(block: Block, key: v9030.Hash): Promise<v9030.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9030.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9030.Hash): AsyncIterable<v9030.Hash[]>
    getPairs(block: Block): Promise<[k: v9030.Hash, v: (v9030.Proposal | undefined)][]>
    getPairs(block: Block, key: v9030.Hash): Promise<[k: v9030.Hash, v: (v9030.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9030.Hash, v: (v9030.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9030.Hash): AsyncIterable<[k: v9030.Hash, v: (v9030.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9040  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9040.Hash): Promise<(v9040.Proposal | undefined)>
    getMany(block: Block, keys: v9040.Hash[]): Promise<(v9040.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9040.Hash[]>
    getKeys(block: Block, key: v9040.Hash): Promise<v9040.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9040.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9040.Hash): AsyncIterable<v9040.Hash[]>
    getPairs(block: Block): Promise<[k: v9040.Hash, v: (v9040.Proposal | undefined)][]>
    getPairs(block: Block, key: v9040.Hash): Promise<[k: v9040.Hash, v: (v9040.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9040.Hash, v: (v9040.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9040.Hash): AsyncIterable<[k: v9040.Hash, v: (v9040.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9050  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9050.Hash): Promise<(v9050.Proposal | undefined)>
    getMany(block: Block, keys: v9050.Hash[]): Promise<(v9050.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9050.Hash[]>
    getKeys(block: Block, key: v9050.Hash): Promise<v9050.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9050.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9050.Hash): AsyncIterable<v9050.Hash[]>
    getPairs(block: Block): Promise<[k: v9050.Hash, v: (v9050.Proposal | undefined)][]>
    getPairs(block: Block, key: v9050.Hash): Promise<[k: v9050.Hash, v: (v9050.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9050.Hash, v: (v9050.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9050.Hash): AsyncIterable<[k: v9050.Hash, v: (v9050.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9080  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9080.Hash): Promise<(v9080.Proposal | undefined)>
    getMany(block: Block, keys: v9080.Hash[]): Promise<(v9080.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9080.Hash[]>
    getKeys(block: Block, key: v9080.Hash): Promise<v9080.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9080.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9080.Hash): AsyncIterable<v9080.Hash[]>
    getPairs(block: Block): Promise<[k: v9080.Hash, v: (v9080.Proposal | undefined)][]>
    getPairs(block: Block, key: v9080.Hash): Promise<[k: v9080.Hash, v: (v9080.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9080.Hash, v: (v9080.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9080.Hash): AsyncIterable<[k: v9080.Hash, v: (v9080.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9090  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9090.Hash): Promise<(v9090.Proposal | undefined)>
    getMany(block: Block, keys: v9090.Hash[]): Promise<(v9090.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9090.Hash[]>
    getKeys(block: Block, key: v9090.Hash): Promise<v9090.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9090.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9090.Hash): AsyncIterable<v9090.Hash[]>
    getPairs(block: Block): Promise<[k: v9090.Hash, v: (v9090.Proposal | undefined)][]>
    getPairs(block: Block, key: v9090.Hash): Promise<[k: v9090.Hash, v: (v9090.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9090.Hash, v: (v9090.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9090.Hash): AsyncIterable<[k: v9090.Hash, v: (v9090.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9100  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9100.Hash): Promise<(v9100.Proposal | undefined)>
    getMany(block: Block, keys: v9100.Hash[]): Promise<(v9100.Proposal | undefined)[]>
    getKeys(block: Block): Promise<v9100.Hash[]>
    getKeys(block: Block, key: v9100.Hash): Promise<v9100.Hash[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9100.Hash[]>
    getKeysPaged(pageSize: number, block: Block, key: v9100.Hash): AsyncIterable<v9100.Hash[]>
    getPairs(block: Block): Promise<[k: v9100.Hash, v: (v9100.Proposal | undefined)][]>
    getPairs(block: Block, key: v9100.Hash): Promise<[k: v9100.Hash, v: (v9100.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9100.Hash, v: (v9100.Proposal | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9100.Hash): AsyncIterable<[k: v9100.Hash, v: (v9100.Proposal | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9111  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9111.H256): Promise<(v9111.Call | undefined)>
    getMany(block: Block, keys: v9111.H256[]): Promise<(v9111.Call | undefined)[]>
    getKeys(block: Block): Promise<v9111.H256[]>
    getKeys(block: Block, key: v9111.H256): Promise<v9111.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9111.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9111.H256): AsyncIterable<v9111.H256[]>
    getPairs(block: Block): Promise<[k: v9111.H256, v: (v9111.Call | undefined)][]>
    getPairs(block: Block, key: v9111.H256): Promise<[k: v9111.H256, v: (v9111.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9111.H256, v: (v9111.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9111.H256): AsyncIterable<[k: v9111.H256, v: (v9111.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9122  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9122.H256): Promise<(v9122.Call | undefined)>
    getMany(block: Block, keys: v9122.H256[]): Promise<(v9122.Call | undefined)[]>
    getKeys(block: Block): Promise<v9122.H256[]>
    getKeys(block: Block, key: v9122.H256): Promise<v9122.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9122.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9122.H256): AsyncIterable<v9122.H256[]>
    getPairs(block: Block): Promise<[k: v9122.H256, v: (v9122.Call | undefined)][]>
    getPairs(block: Block, key: v9122.H256): Promise<[k: v9122.H256, v: (v9122.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9122.H256, v: (v9122.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9122.H256): AsyncIterable<[k: v9122.H256, v: (v9122.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9130  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9130.H256): Promise<(v9130.Call | undefined)>
    getMany(block: Block, keys: v9130.H256[]): Promise<(v9130.Call | undefined)[]>
    getKeys(block: Block): Promise<v9130.H256[]>
    getKeys(block: Block, key: v9130.H256): Promise<v9130.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9130.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9130.H256): AsyncIterable<v9130.H256[]>
    getPairs(block: Block): Promise<[k: v9130.H256, v: (v9130.Call | undefined)][]>
    getPairs(block: Block, key: v9130.H256): Promise<[k: v9130.H256, v: (v9130.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9130.H256, v: (v9130.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9130.H256): AsyncIterable<[k: v9130.H256, v: (v9130.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9160  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9160.H256): Promise<(v9160.Call | undefined)>
    getMany(block: Block, keys: v9160.H256[]): Promise<(v9160.Call | undefined)[]>
    getKeys(block: Block): Promise<v9160.H256[]>
    getKeys(block: Block, key: v9160.H256): Promise<v9160.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9160.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9160.H256): AsyncIterable<v9160.H256[]>
    getPairs(block: Block): Promise<[k: v9160.H256, v: (v9160.Call | undefined)][]>
    getPairs(block: Block, key: v9160.H256): Promise<[k: v9160.H256, v: (v9160.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9160.H256, v: (v9160.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9160.H256): AsyncIterable<[k: v9160.H256, v: (v9160.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9170  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9170.H256): Promise<(v9170.Call | undefined)>
    getMany(block: Block, keys: v9170.H256[]): Promise<(v9170.Call | undefined)[]>
    getKeys(block: Block): Promise<v9170.H256[]>
    getKeys(block: Block, key: v9170.H256): Promise<v9170.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9170.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9170.H256): AsyncIterable<v9170.H256[]>
    getPairs(block: Block): Promise<[k: v9170.H256, v: (v9170.Call | undefined)][]>
    getPairs(block: Block, key: v9170.H256): Promise<[k: v9170.H256, v: (v9170.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9170.H256, v: (v9170.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9170.H256): AsyncIterable<[k: v9170.H256, v: (v9170.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9180  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9180.H256): Promise<(v9180.Call | undefined)>
    getMany(block: Block, keys: v9180.H256[]): Promise<(v9180.Call | undefined)[]>
    getKeys(block: Block): Promise<v9180.H256[]>
    getKeys(block: Block, key: v9180.H256): Promise<v9180.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9180.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9180.H256): AsyncIterable<v9180.H256[]>
    getPairs(block: Block): Promise<[k: v9180.H256, v: (v9180.Call | undefined)][]>
    getPairs(block: Block, key: v9180.H256): Promise<[k: v9180.H256, v: (v9180.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9180.H256, v: (v9180.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9180.H256): AsyncIterable<[k: v9180.H256, v: (v9180.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9190  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9190.H256): Promise<(v9190.Call | undefined)>
    getMany(block: Block, keys: v9190.H256[]): Promise<(v9190.Call | undefined)[]>
    getKeys(block: Block): Promise<v9190.H256[]>
    getKeys(block: Block, key: v9190.H256): Promise<v9190.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9190.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9190.H256): AsyncIterable<v9190.H256[]>
    getPairs(block: Block): Promise<[k: v9190.H256, v: (v9190.Call | undefined)][]>
    getPairs(block: Block, key: v9190.H256): Promise<[k: v9190.H256, v: (v9190.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9190.H256, v: (v9190.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9190.H256): AsyncIterable<[k: v9190.H256, v: (v9190.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9220  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9220.H256): Promise<(v9220.Call | undefined)>
    getMany(block: Block, keys: v9220.H256[]): Promise<(v9220.Call | undefined)[]>
    getKeys(block: Block): Promise<v9220.H256[]>
    getKeys(block: Block, key: v9220.H256): Promise<v9220.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9220.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9220.H256): AsyncIterable<v9220.H256[]>
    getPairs(block: Block): Promise<[k: v9220.H256, v: (v9220.Call | undefined)][]>
    getPairs(block: Block, key: v9220.H256): Promise<[k: v9220.H256, v: (v9220.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9220.H256, v: (v9220.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9220.H256): AsyncIterable<[k: v9220.H256, v: (v9220.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9230  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9230.H256): Promise<(v9230.Call | undefined)>
    getMany(block: Block, keys: v9230.H256[]): Promise<(v9230.Call | undefined)[]>
    getKeys(block: Block): Promise<v9230.H256[]>
    getKeys(block: Block, key: v9230.H256): Promise<v9230.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9230.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9230.H256): AsyncIterable<v9230.H256[]>
    getPairs(block: Block): Promise<[k: v9230.H256, v: (v9230.Call | undefined)][]>
    getPairs(block: Block, key: v9230.H256): Promise<[k: v9230.H256, v: (v9230.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9230.H256, v: (v9230.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9230.H256): AsyncIterable<[k: v9230.H256, v: (v9230.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9250  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9250.H256): Promise<(v9250.Call | undefined)>
    getMany(block: Block, keys: v9250.H256[]): Promise<(v9250.Call | undefined)[]>
    getKeys(block: Block): Promise<v9250.H256[]>
    getKeys(block: Block, key: v9250.H256): Promise<v9250.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9250.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9250.H256): AsyncIterable<v9250.H256[]>
    getPairs(block: Block): Promise<[k: v9250.H256, v: (v9250.Call | undefined)][]>
    getPairs(block: Block, key: v9250.H256): Promise<[k: v9250.H256, v: (v9250.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9250.H256, v: (v9250.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9250.H256): AsyncIterable<[k: v9250.H256, v: (v9250.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9271  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9271.H256): Promise<(v9271.Call | undefined)>
    getMany(block: Block, keys: v9271.H256[]): Promise<(v9271.Call | undefined)[]>
    getKeys(block: Block): Promise<v9271.H256[]>
    getKeys(block: Block, key: v9271.H256): Promise<v9271.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9271.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9271.H256): AsyncIterable<v9271.H256[]>
    getPairs(block: Block): Promise<[k: v9271.H256, v: (v9271.Call | undefined)][]>
    getPairs(block: Block, key: v9271.H256): Promise<[k: v9271.H256, v: (v9271.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9271.H256, v: (v9271.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9271.H256): AsyncIterable<[k: v9271.H256, v: (v9271.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9291  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9291.H256): Promise<(v9291.Call | undefined)>
    getMany(block: Block, keys: v9291.H256[]): Promise<(v9291.Call | undefined)[]>
    getKeys(block: Block): Promise<v9291.H256[]>
    getKeys(block: Block, key: v9291.H256): Promise<v9291.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9291.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9291.H256): AsyncIterable<v9291.H256[]>
    getPairs(block: Block): Promise<[k: v9291.H256, v: (v9291.Call | undefined)][]>
    getPairs(block: Block, key: v9291.H256): Promise<[k: v9291.H256, v: (v9291.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9291.H256, v: (v9291.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9291.H256): AsyncIterable<[k: v9291.H256, v: (v9291.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9300  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9300.H256): Promise<(v9300.Call | undefined)>
    getMany(block: Block, keys: v9300.H256[]): Promise<(v9300.Call | undefined)[]>
    getKeys(block: Block): Promise<v9300.H256[]>
    getKeys(block: Block, key: v9300.H256): Promise<v9300.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9300.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9300.H256): AsyncIterable<v9300.H256[]>
    getPairs(block: Block): Promise<[k: v9300.H256, v: (v9300.Call | undefined)][]>
    getPairs(block: Block, key: v9300.H256): Promise<[k: v9300.H256, v: (v9300.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9300.H256, v: (v9300.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9300.H256): AsyncIterable<[k: v9300.H256, v: (v9300.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9320  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9320.H256): Promise<(v9320.Call | undefined)>
    getMany(block: Block, keys: v9320.H256[]): Promise<(v9320.Call | undefined)[]>
    getKeys(block: Block): Promise<v9320.H256[]>
    getKeys(block: Block, key: v9320.H256): Promise<v9320.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9320.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9320.H256): AsyncIterable<v9320.H256[]>
    getPairs(block: Block): Promise<[k: v9320.H256, v: (v9320.Call | undefined)][]>
    getPairs(block: Block, key: v9320.H256): Promise<[k: v9320.H256, v: (v9320.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9320.H256, v: (v9320.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9320.H256): AsyncIterable<[k: v9320.H256, v: (v9320.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9340  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9340.H256): Promise<(v9340.Call | undefined)>
    getMany(block: Block, keys: v9340.H256[]): Promise<(v9340.Call | undefined)[]>
    getKeys(block: Block): Promise<v9340.H256[]>
    getKeys(block: Block, key: v9340.H256): Promise<v9340.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9340.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9340.H256): AsyncIterable<v9340.H256[]>
    getPairs(block: Block): Promise<[k: v9340.H256, v: (v9340.Call | undefined)][]>
    getPairs(block: Block, key: v9340.H256): Promise<[k: v9340.H256, v: (v9340.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9340.H256, v: (v9340.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9340.H256): AsyncIterable<[k: v9340.H256, v: (v9340.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9350  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9350.H256): Promise<(v9350.Call | undefined)>
    getMany(block: Block, keys: v9350.H256[]): Promise<(v9350.Call | undefined)[]>
    getKeys(block: Block): Promise<v9350.H256[]>
    getKeys(block: Block, key: v9350.H256): Promise<v9350.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9350.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9350.H256): AsyncIterable<v9350.H256[]>
    getPairs(block: Block): Promise<[k: v9350.H256, v: (v9350.Call | undefined)][]>
    getPairs(block: Block, key: v9350.H256): Promise<[k: v9350.H256, v: (v9350.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9350.H256, v: (v9350.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9350.H256): AsyncIterable<[k: v9350.H256, v: (v9350.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9370  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9370.H256): Promise<(v9370.Call | undefined)>
    getMany(block: Block, keys: v9370.H256[]): Promise<(v9370.Call | undefined)[]>
    getKeys(block: Block): Promise<v9370.H256[]>
    getKeys(block: Block, key: v9370.H256): Promise<v9370.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9370.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9370.H256): AsyncIterable<v9370.H256[]>
    getPairs(block: Block): Promise<[k: v9370.H256, v: (v9370.Call | undefined)][]>
    getPairs(block: Block, key: v9370.H256): Promise<[k: v9370.H256, v: (v9370.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9370.H256, v: (v9370.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9370.H256): AsyncIterable<[k: v9370.H256, v: (v9370.Call | undefined)][]>
}

/**
 *  Actual proposal for a given hash, if it's current.
 */
export interface ProposalOfV9381  {
    is(block: RuntimeCtx): boolean
    get(block: Block, key: v9381.H256): Promise<(v9381.Call | undefined)>
    getMany(block: Block, keys: v9381.H256[]): Promise<(v9381.Call | undefined)[]>
    getKeys(block: Block): Promise<v9381.H256[]>
    getKeys(block: Block, key: v9381.H256): Promise<v9381.H256[]>
    getKeysPaged(pageSize: number, block: Block): AsyncIterable<v9381.H256[]>
    getKeysPaged(pageSize: number, block: Block, key: v9381.H256): AsyncIterable<v9381.H256[]>
    getPairs(block: Block): Promise<[k: v9381.H256, v: (v9381.Call | undefined)][]>
    getPairs(block: Block, key: v9381.H256): Promise<[k: v9381.H256, v: (v9381.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block): AsyncIterable<[k: v9381.H256, v: (v9381.Call | undefined)][]>
    getPairsPaged(pageSize: number, block: Block, key: v9381.H256): AsyncIterable<[k: v9381.H256, v: (v9381.Call | undefined)][]>
}
