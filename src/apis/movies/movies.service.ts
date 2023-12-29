import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { IMovieServiceFindOne } from './interfaces/movies-service.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>, //
    ) {}

    // 영화 전체 조회
    findAllMovies(): Promise<Movie[]> {
        return this.moviesRepository.find({
            // relations: [
            //     'productSaleslocation',
            //     'productCategory',
            //     'productTags',
            // ],
        });
    }

    // 영화 상세 조회

    async findOneMovie({
        movieId,
    }: IMovieServiceFindOne): Promise<Movie | string> {
        const movie = await this.moviesRepository.findOne({
            where: { id: movieId },
            // relations: [
            //     'productSaleslocation',
            //     'productCategory',
            //     'productTags',
            // ],
        });
        if (!movie) return '존재하지 않는 영화입니다.';
        return movie;
    }

    // 영화 생성
    async create(movieData: CreateMovieDto): Promise<Movie> {
        const createdMovie = this.moviesRepository.save({
            ...movieData,
        });
        return createdMovie;
    }

    // 영화 수정
    async update(
        { movieId }: IMovieServiceFindOne,
        updateData: UpdateMovieDto,
    ): Promise<Movie> {
        const movie = await this.moviesRepository.findOne({
            where: { id: movieId },
        });

        const result = this.moviesRepository.save({
            ...movie,
            ...updateData,
        });
        return result;
    }

    // 영화 삭제
    async delete({ movieId }: IMovieServiceFindOne): Promise<boolean> {
        const result = await this.moviesRepository.softDelete({
            id: movieId,
        });
        return result.affected ? true : false;
    }
}
