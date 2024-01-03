import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieImage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 이미지파일
    @Column()
    image: string;

    // N : 1 , 영화 한 편이 여러 개의 이미지를 가질 수 있음
    @ManyToOne(() => Movie)
    movie: Movie;
}
