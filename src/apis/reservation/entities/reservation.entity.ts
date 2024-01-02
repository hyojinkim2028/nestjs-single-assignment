import { MovieSeat } from 'src/apis/moviesSeats/entities/movieSeat.entity';
import { MovieSlot } from 'src/apis/moviesSlot/entities/moviesSlot.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export type Seat = 'special' | 'standard';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 좌석타입
    @Column()
    seatTypes: Seat;

    // 총 티켓 수량
    @Column()
    quantity: number;

    // 총 티켓 갸격
    @Column()
    totalAmount: number;

    // 예매 거래시간
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // N : 1 , 유저 한 명이 여러 개의 예약 가능
    @ManyToOne(() => User)
    user: User;

    // N : 1 , 영화시간대 하나가 여러 개의 예매정보를 가질 수 있음
    @ManyToOne(() => MovieSlot)
    movieSlot: MovieSlot;

    // N : M, 예약정보 여러개가 여러개의 좌석을 가질 수 있음
    @JoinTable()
    @ManyToMany(() => MovieSeat, (moviesSeats) => moviesSeats.reservations)
    moviesSeats: MovieSeat[];
}
