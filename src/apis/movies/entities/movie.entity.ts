import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 영화제목
    @Column()
    title: string;

    // 상영시간
    @Column()
    time: string;

    // 상영관
    @Column()
    theater: number;

    // 티켓 가격
    @Column()
    price: number;

    // 관람가능좌석수
    @Column()
    seats: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // N : 1 , 영화 한 편이 여러 개의 예매정보를 가질 수 있음
    @ManyToOne(() => User)
    user: User;
}
