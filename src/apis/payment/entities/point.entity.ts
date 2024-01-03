import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Point {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 포인트 입금
    @Column()
    plusPoint: number;

    // 포인트 출금
    @Column()
    minusPoint: number;

    // 잔여 포인트
    @Column()
    balance: number;

    // 예매 거래시간
    @CreateDateColumn()
    createdAt: Date;

    // N : 1 , 유저 한 명이 여러 개의 포인트아이디를 가질 수 있음
    @ManyToOne(() => User, (user) => user.point)
    @JoinColumn()
    user: User;

    @Column()
    userId: number;
}
