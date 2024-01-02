import { Reservation } from 'src/apis/reservation/entities/reservation.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieSeat {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 좌석 번호
    @Column()
    seatNumber: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // N : M , 영화 좌석 여러개가 여러 예매정보에 들어갈 수 있음
    @ManyToMany(() => Reservation, (reservations) => reservations.moviesSeats)
    reservations: Reservation[];
}
