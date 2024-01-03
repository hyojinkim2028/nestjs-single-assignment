import { Point } from 'src/apis/payment/entities/point.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 이메일
    @Column()
    email: string;

    // 비밀번호
    @Column()
    password: string;

    // 닉네임
    @Column()
    nickname: string;

    // 관리자여부 : 일반유저 false, 관리자 true
    @Column({ default: false })
    role: boolean;

    // 회원가입일
    @CreateDateColumn()
    createdAt: Date;

    // 1:N, 유저 한 명이 여러 개의 포인트아이디를 가질 수 있음
    @OneToMany(() => Point, (point) => point.user)
    point: Point[];
}
