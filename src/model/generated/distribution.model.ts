import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Distribution {
    constructor(props?: Partial<Distribution>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    referendumIndex!: number

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Column_("int4", {nullable: false})
    distributionVersion!: number

    @Column_("int4", {nullable: false})
    governanceVersion!: number

    @Index_()
    @Column_("text", {nullable: true})
    wallet!: string | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountConsidered!: bigint

    @Column_("int4", {nullable: true})
    indexItemReceived!: number | undefined | null

    @Column_("text", {nullable: true})
    dragonEquipped!: string | undefined | null

    @Column_("numeric", {array: true, nullable: true})
    chancesAtItems!: (number | undefined | null)[] | undefined | null

    @Column_("int4", {nullable: true})
    quizCorrect!: number | undefined | null

    @Column_("int4", {nullable: true})
    identity!: number | undefined | null

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
