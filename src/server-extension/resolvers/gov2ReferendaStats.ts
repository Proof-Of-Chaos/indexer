import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { ConvictionVote } from '../../model/generated'
import { gov2referendaStatsQuery } from '../queries/gov2Referenda';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class gov2ReferendaStats {
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

    @Field(() => Number, { nullable: true })
    referendum_ayes!: number

    @Field(() => Number, { nullable: true })
    referendum_nays!: number

    @Field(() => String, { nullable: true })
    decision_deposit_who!: string

    @Field(() => Number, { nullable: true })
    decision_deposit_amount!: number

    @Field(() => String, { nullable: true })
    submission_deposit_who!: string

    @Field(() => Number, { nullable: true })
    submission_deposit_amount!: number

    @Field(() => Number, { nullable: true })
    track!: number

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
    voted_amount_with_conviction_aye!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_nay!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_total!: number

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
    passed_at!: Date

    @Field(() => Date, { nullable: true })
    not_passed_at!: Date

    @Field(() => Date, { nullable: true })
    cancelled_at!: Date

    @Field(() => Date, { nullable: true })
    executed_at!: Date

    @Field(() => Date, { nullable: true })
    timedout_at!: Date

    @Field(() => Date, { nullable: true })
    decision_started_at!: Date

    // @Field(() => String, { nullable: false })
    // threshold_type!: string

    @Field(() => Number, { nullable: true })
    count_quiz_attended_wallets!: number

    @Field(() => Number, { nullable: true })
    count_fully_correct!: number

    @Field(() => Number, { nullable: true })
    quiz_fully_correct_perc!: number

    @Field(() => Number, { nullable: true })
    count_1_question_correct_perc!: number

    @Field(() => Number, { nullable: true })
    count_2_question_correct_perc!: number

    @Field(() => Number, { nullable: true })
    count_3_question_correct_perc!: number

    @Field(() => Number, { nullable: false })
    count_direct!: number

    @Field(() => Number, { nullable: false })
    count_delegated!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_direct!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_delegated!: number

    @Field(() => Number, { nullable: true })
    count_validator!: number

    @Field(() => Number, { nullable: true })
    count_normal!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_validator!: number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction_normal!: number


    constructor(props: Partial<gov2ReferendaStats>) {
        Object.assign(this, props);
    }
}

export let gov2ReferendaCache = new Map<number, gov2ReferendaStats>()

export let gov2NeedUpdate = new Array()

@Resolver()
export class gov2ReferendaStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [gov2ReferendaStats])
    async gov2referendaStats(
        @Arg("ids", () => [Number], { nullable: false, defaultValue: [] })
        ids: Number[]
    ): Promise<gov2ReferendaStats[]> {
        gov2NeedUpdate.forEach((referendumIndex: number, index: number) => {
            gov2ReferendaCache.delete(referendumIndex)
            gov2NeedUpdate.splice(index, 1)
        })
        const manager = await this.tx()
        const newRefs: gov2ReferendaStats[] = await manager.getRepository(ConvictionVote).query(gov2referendaStatsQuery, [[...(Array.from(gov2ReferendaCache.keys())), ...ids]])
        let toSendBack: gov2ReferendaStats[] = []
        gov2ReferendaCache.forEach((value: gov2ReferendaStats, key: number) => { if (!(key in ids)) (toSendBack.push(value)) })
        const result: gov2ReferendaStats[] = [...toSendBack, ...newRefs]
        newRefs.forEach((r: gov2ReferendaStats) => { if (r.ended_at) gov2ReferendaCache.set(r.referendum_index, r) })
        return result
    }
}
