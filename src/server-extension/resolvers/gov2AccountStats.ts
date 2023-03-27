import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'
import { ConvictionVote } from '../../model/generated'
import { gov2accountStatsQuery } from '../queries/gov2account';

// Define custom GraphQL ObjectType of the query result
@ObjectType()
export class gov2AccountStats {
    
    @Field(() => Number, { nullable: false })
    referendum_index!: number

    @Field(() => String, { nullable: false })
    voter!: string

    @Field(() => Number, { nullable: false })
    first_referendum_index!: number

    @Field(() => Date, { nullable: true })
    first_voting_timestamp!: Date

    @Field(() => Number, { nullable: true })
    conviction!: number

    @Field(() => String, { nullable: true })
    decision!: string

    @Field(() => Number, { nullable: true })
    balance_value!: Number

    @Field(() => Number, { nullable: true })
    voted_amount_with_conviction!: number

    @Field(() => String, { nullable: true })
    voting_time_group!: string

    @Field(() => String, { nullable: true })
    voting_result_group!: string

    @Field(() => Number, { nullable: true })
    questions_count!: Number

    @Field(() => Number, { nullable: true })
    correct_answers_count!: Number

    @Field(() => Number, { nullable: true })
    quiz_fully_correct!: Number

    @Field(() => String, { nullable: true })
    voter_type!: string
    
    @Field(() => String, { nullable: true })
    delegated_to!: string
    
    @Field(() => String, { nullable: true })
    type!: string

    constructor(props: Partial<gov2AccountStats>) {
        Object.assign(this, props);
    }
}

@Resolver()
export class gov2AccountStatsResolver {
    // Set by depenency injection
    constructor(private tx: () => Promise<EntityManager>) { }

    @Query(() => [gov2AccountStats])
    async gov2accountStats(
        @Arg("address", {nullable: false})
        address: string
    ): Promise<gov2AccountStats> {
        const manager = await this.tx()
        const result: gov2AccountStats = await manager.getRepository(ConvictionVote).query(gov2accountStatsQuery, [address])
        return result
    }
}
