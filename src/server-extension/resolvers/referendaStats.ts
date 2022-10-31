import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { Vote } from '../../model/generated'
import { referendaStats } from '../queries/referenda';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class ReferendaStats {
    @Field(() => Number, { nullable: false })
    referendum_index!: number

    @Field(() => Number, { nullable: false })
    index!: number

    @Field(() => Date, { nullable: false })
    created_at!: Date

    @Field(() => Date, { nullable: true })
    ended_at!: Date

    @Field(() => String, { nullable: false })
    status!: string

    @Field(() => Number, { nullable: false })
    delay!: number

    @Field(() => Number, { nullable: false })
    ends_at!: number

    @Field(() => String, { nullable: false })
    proposer!: string

    @Field(() => String, { nullable: true })
    preimage_proposer!: string

    @Field(() => String, { nullable: true })
    method!: string

    @Field(() => String, { nullable: true })
    section!: string

    @Field(() => Number, { nullable: true })
    count_aye!: number

    @Field(() => Number, { nullable: true })
    count_nay!: number

    @Field(() => Number, { nullable: true })
    count_total!: number

    @Field(() => Number, { nullable: true })
    voted_amount_aye!: number

    @Field(() => Number, { nullable: true })
    voted_amount_nay!: number

    @Field(() => Number, { nullable: true })
    voted_amount_total!: number

    @Field(() => Number, { nullable: true })
    total_issuance!: number

    @Field(() => Number, { nullable: true })
    turnout_aye_perc!: number

    @Field(() => Number, { nullable: true })
    turnout_nay_perc!: number

    @Field(() => Number, { nullable: true })
    turnout_total_perc!: number

    @Field(() => Number, { nullable: true })
    count_new!: number

    @Field(() => Number, { nullable: true })
    count_new_perc!: number

    @Field(() => Number, { nullable: true })
    vote_duration!: number

    @Field(() => Number, { nullable: true })
    conviction_mean_aye!: number

    @Field(() => Number, { nullable: true })
    conviction_mean_nay!: number

    @Field(() => Number, { nullable: true })
    conviction_mean!: number

    @Field(() => Number, { nullable: true })
    conviction_median_aye!: number

    @Field(() => Number, { nullable: true })
    conviction_median_nay!: number

    @Field(() => Number, { nullable: true })
    conviction_median!: number

    @Field(() => Number, { nullable: true })
    count_0_4_1_4_vote_duration!: number

    @Field(() => Number, { nullable: true })
    count_1_4_2_4_vote_duration!: number

    @Field(() => Number, { nullable: true })
    count_2_4_3_4_vote_duration!: number

    @Field(() => Number, { nullable: true })
    count_3_4_4_4_vote_duration!: number

    @Field(() => Number, { nullable: true })
    count_0_4_1_4_vote_duration_perc!: number

    @Field(() => Number, { nullable: true })
    count_1_4_2_4_vote_duration_perc!: number

    @Field(() => Number, { nullable: true })
    count_2_4_3_4_vote_duration_perc!: number

    @Field(() => Number, { nullable: true })
    count_3_4_4_4_vote_duration_perc!: number

    @Field(() => Date, { nullable: true })
    executed_at!: Date

    @Field(() => Date, { nullable: true })
    passed_at!: Date

    @Field(() => Date, { nullable: true })
    not_passed_at!: Date

    @Field(() => Date, { nullable: true })
    cancelled_at!: Date

    @Field(() => String, { nullable: false })
    threshold_type!: string

    @Field(() => Number, { nullable: true })
    count_quiz_attended_wallets!: number

    @Field(() => Number, { nullable: true })
    count_fully_correct!: number

    @Field(() => Number, { nullable: true })
    quiz_fully_correct_perc!: number
    
    @Field(() => Number, { nullable: true })
    questions_count!: number

    @Field(() => Number, { nullable: true })
    count_1_question_correct!: number

    @Field(() => Number, { nullable: true })
    count_2_question_correct!: number

    @Field(() => Number, { nullable: true })
    count_3_question_correct!: number

    @Field(() => Number, { nullable: false })
    count_direct!: number

    @Field(() => Number, { nullable: false })
    count_delegated!: number

    @Field(() => Number, { nullable: true })
    voted_amount_direct!: number

    @Field(() => Number, { nullable: true })
    voted_amount_delegated!: number

    @Field(() => Number, { nullable: true })
    count_validator!: number

    @Field(() => Number, { nullable: true })
    count_councillor!: number

    @Field(() => Number, { nullable: true })
    count_normal!: number

    @Field(() => Number, { nullable: true })
    voted_amount_validator!: number

    @Field(() => Number, { nullable: true })
    voted_amount_councillor!: number

    @Field(() => Number, { nullable: true })
    voted_amount_normal!: number


    constructor(props: Partial<ReferendaStats>) {
        Object.assign(this, props);
    }
}

export let referendaCache = new Map<number, ReferendaStats>()

export let needUpdate = new Array()

@Resolver()
export class ReferendaStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [ReferendaStats])
    async referendaStats(
        @Arg("ids", () => [Number], { nullable: false, defaultValue: [] })
        ids: Number[]
    ): Promise<ReferendaStats[]> {
        needUpdate.forEach((referendumIndex: number, index: number) => {
            referendaCache.delete(referendumIndex)
            needUpdate.splice(index, 1)
        })
        const manager = await this.tx()
        const newRefs: ReferendaStats[] = await manager.getRepository(Vote).query(referendaStats, [[...(Array.from(referendaCache.keys())), ...ids]])
        let toSendBack: ReferendaStats[] = []
        referendaCache.forEach((value: ReferendaStats, key: number) => { if (!(key in ids)) (toSendBack.push(value)) })
        const result: ReferendaStats[] = [...toSendBack, ...newRefs]
        newRefs.forEach((r: ReferendaStats) => { if (r.ended_at) referendaCache.set(r.referendum_index, r) })
        return result
    }
}
