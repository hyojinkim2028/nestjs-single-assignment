import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService, //
    ) {}

    // 영화 전체 조회
    @Get()
    getAllMovies(): Promise<Movie[]> {
        return this.moviesService.findAllMovies();
    }

    // 영화 상세 조회
    @Get('/:movieId')
    findOneById(
        @Param('movieId') movieId: number, //
    ): Promise<Movie | string> {
        return this.moviesService.findOneMovie({ movieId });
    }

    // 영화 생성
    @Post()
    createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(movieData);
    }

    // 영화 수정
    @Patch('/:movieId')
    updateMovie(
        @Param('movieId') movieId: number, //
        @Body() updateData: UpdateMovieDto,
    ): Promise<Movie> {
        return this.moviesService.update({ movieId }, updateData);
    }

    // 영화 삭제
    @Delete('/:movieId')
    deleteMovie(
        @Param('movieId') movieId: number, //
    ): Promise<boolean> {
        return this.moviesService.delete({ movieId });
    }
}
