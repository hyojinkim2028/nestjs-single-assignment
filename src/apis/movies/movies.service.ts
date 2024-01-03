import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import {
    IMovieServiceFindOne,
    IMovieServiceFindOneByName,
    IMovieServiceUserId,
} from './interfaces/movies-service.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieImage } from '../moviesImages/entities/movieImage.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private readonly moviesRepository: Repository<Movie>, //

        @InjectRepository(MovieImage)
        private readonly MoviesImagesRepository: Repository<MovieImage>, //

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>, //
    ) {}

    // 영화 전체 조회
    findAllMovies(): Promise<Movie[]> {
        return this.moviesRepository.find({
            relations: ['movieCategory'],
        });
    }

    // 영화 이름으로 검색
    async findOneMovieOfName({
        keyword,
    }: IMovieServiceFindOneByName): Promise<Movie[]> {
        return this.moviesRepository
            .createQueryBuilder('movie')
            .where('movie.title LIKE :keyword', { keyword: `%${keyword}%` })
            .getMany();
    }

    // 영화 상세 조회
    async findOneMovie({
        movieId,
    }: IMovieServiceFindOne): Promise<Movie | string> {
        return await this.moviesRepository.findOne({
            where: { id: movieId },
            relations: ['movieCategory'],
        });
    }

    // 영화 생성
    async create(
        movieData: CreateMovieDto,
        { userId }: IMovieServiceUserId,
    ): Promise<Movie> {
        // 권한 여부 확인, 관리자가 아닐시 리턴
        const checkUser = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!checkUser.role) {
            throw new ForbiddenException('관리자에게 권한이 있습니다');
        }

        const { movieCategoryId, ...movie } = movieData;

        const createdMovie = await this.moviesRepository.save({
            ...movie,
            movieCategory: {
                id: movieCategoryId,
            },
            // movieImage: {
            //     id: imageId.id,
            // },
        });
        return createdMovie;
    }

    // 영화 수정
    async update(
        { movieId }: IMovieServiceFindOne,
        updateData: UpdateMovieDto,
        { userId }: IMovieServiceUserId,
    ): Promise<Movie> {
        // 권한 여부 확인, 관리자가 아닐시 리턴
        const checkUser = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!checkUser.role) {
            throw new ForbiddenException('관리자에게 권한이 있습니다');
        }

        const movie = await this.moviesRepository.findOne({
            where: { id: movieId },
        });

        const { movieCategoryId, ...data } = updateData;

        const result = this.moviesRepository.save({
            ...movie,
            movieCategory: {
                id: movieCategoryId,
            },
            ...data,
        });
        return result;
    }

    // 영화 삭제
    async delete(
        { movieId }: IMovieServiceFindOne,
        { userId }: IMovieServiceUserId,
    ): Promise<boolean> {
        // 권한 여부 확인, 관리자가 아닐시 리턴
        const checkUser = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!checkUser.role) {
            throw new ForbiddenException('관리자에게 권한이 있습니다');
        }

        const result = await this.moviesRepository.softDelete({
            id: movieId,
        });
        return result.affected ? true : false;
    }
}
