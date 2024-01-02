import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieRoom {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 관람관 이름
    @Column()
    roomName: string;

    // 스페셜타입 좌석 수
    @Column()
    specialSeats: number;

    // 스탠다드타입 좌석 수
    @Column()
    standardSeats: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
