import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Point {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    // 포인트 입금
    @Column()
    @Field(() => Int)
    plusPoint: number;

    // 포인트 출금
    @Column()
    @Field(() => Int)
    minusPoint: number;

    // 잔여 포인트
    @Column()
    @Field(() => Int)
    balance: number;

    // 예매 거래시간
    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    // N : 1 , 유저 한 명이 여러 개의 포인트아이디를 가질 수 있음
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;
}
