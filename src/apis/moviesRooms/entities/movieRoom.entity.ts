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

    // 스페셜타입 자리 행
    @Column()
    specialRow: number;

    // 스페셜타입 자리 열
    @Column()
    specialCal: number;

    // 스탠다드타입 자리 행
    @Column()
    standardRow: number;

    // 스탠다드타입 자리 열
    @Column()
    standardCal: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
