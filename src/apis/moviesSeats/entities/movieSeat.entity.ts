import { Reservation } from 'src/apis/reservation/entities/reservation.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum SeatType {
    STANDARD = 'standard',
    SPECIAL = 'special',
}

@Entity()
export class MovieSeat {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 좌석타입
    @Column({ type: 'set', enum: SeatType })
    seatTypes: SeatType[];

    // 좌석위치 행
    @Column()
    row: number;

    // 좌석위치 열
    @Column()
    col: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // N : M , 영화 좌석 여려개가 여러 예매정보에 들어갈 수 있음
    @JoinTable()
    @ManyToMany(() => Reservation, (reservations) => reservations.moviesSeats)
    reservations: Reservation[];
}
