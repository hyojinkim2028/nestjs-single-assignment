import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Movie {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    // 영화제목
    @Column()
    @Field(() => String)
    title: string;

    // 상영시간
    @Column()
    @Field(() => String)
    time: string;

    // 상영관
    @Column()
    @Field(() => Int)
    theater: number;

    // 티켓 가격
    @Column()
    @Field(() => Int)
    price: number;

    // 관람가능좌석수
    @Column()
    @Field(() => Int)
    seats: number;

    // N : 1 , 영화 한 편이 여러 개의 예매정보를 가질 수 있음
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;
}
