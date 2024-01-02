import { Movie } from 'src/apis/movies/entities/movie.entity';
import { MovieRoom } from 'src/apis/moviesRooms/entities/movieRoom.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    // RelationId,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MovieSlot {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // 상영날짜
    @Column()
    date: string;

    // 영화시작시간
    @Column()
    startTime: number;

    // 영화종료시간
    @Column()
    finishTime: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    // @RelationId((movieSlot: MovieSlot) => movieSlot.movie) // you need to specify target relation
    // movieId: number;

    // N : 1 , 여러 상영시간대가 하나의 영화를 가질 수 있음
    @ManyToOne(() => Movie, { eager: true })
    movie: Movie;

    // N : 1 , 여러 상영시간대가 하나의 관람관을 가질 수 있음
    @ManyToOne(() => MovieRoom, { eager: true })
    movieRoom: MovieRoom;
}
