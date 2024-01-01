import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MovieSeat } from 'src/apis/moviesSeats/entities/movieSeat.entity';
import { MovieSlot } from 'src/apis/moviesSlot/entities/moviesSlot.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
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

    // N : 1 , 영화시간대 하나가 여러 개의 예매정보를 가질 수 있음
    @ManyToOne(() => MovieSlot)
    movieSlot: MovieSlot;

    // N : M, 예약정보 여러개가 여러개의 좌석을 가질 수 있음
    @JoinTable()
    @ManyToMany(() => MovieSeat, (moviesSeats) => moviesSeats.reservations)
    moviesSeats: MovieSeat[];
}
