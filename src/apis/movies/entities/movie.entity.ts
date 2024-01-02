import { MovieCategory } from 'src/apis/moviesCategories/entities/moviesCategories.entity';
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

    // 러닝타임
    @Column()
    runTime: number;

    // 티켓 가격
    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // N : 1 , 카테고리 하나가 여러개의 영화를 가질 수 있음
    @ManyToOne(() => MovieCategory)
    movieCategory: MovieCategory;
}
