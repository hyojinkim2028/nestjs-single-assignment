import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    // 이메일
    @Column()
    @Field(() => String)
    email: string;

    // 비밀번호
    @Column()
    // 비밀번호는 브라우저에 전달하지 않음.
    password: string;

    // 닉네임
    @Column()
    @Field(() => String)
    nickname: string;

    // 관리자여부 : 일반유저 false, 관리자 true
    @Column({ default: false })
    @Field(() => Boolean)
    role: boolean;

    // 회원가입일
    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;
}
