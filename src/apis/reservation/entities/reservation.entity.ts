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
export class Reservation {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    // 예매티켓수량
    @Column()
    @Field(() => Int)
    quantity: number;

    // 총티켓가격
    @Column()
    @Field(() => Int)
    totalAmount: number;

    // 좌성지정여부
    @Column()
    @Field(() => Boolean)
    isSeatChoice: boolean;

    // 선택한 좌석
    @Column()
    @Field(() => Int)
    seatNumber: number;

    // 예매 거래시간
    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;

    // N : 1 , 유저 한 명이 여러 개의 예약 가능
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;
}
