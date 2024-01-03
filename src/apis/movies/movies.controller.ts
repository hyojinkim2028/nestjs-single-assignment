import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from '../users/interfaces/users-controller.interface';

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

    // 영화 이름으로 검색
    @Get('search/:keyword')
    findOneByName(
        @Param('keyword') keyword: string, //
    ): Promise<Movie[] | string> {
        return this.moviesService.findOneMovieOfName({ keyword });
    }

    // 영화 상세 조회
    @Get('/:movieId')
    findOneById(
        @Param('movieId') movieId: number, //
    ): Promise<Movie | string> {
        return this.moviesService.findOneMovie({ movieId });
    }

    // 영화 생성
    @UseGuards(AuthGuard('access'))
    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    createMovie(
        // @UploadedFile() file: Express.Multer.File,
        // @Req() req: Request,
        @Req() req: IAuthUser,
        @Body() movieData: CreateMovieDto,
    ): Promise<Movie> {
        const userId = Number(req.user.id);
        return this.moviesService.create(movieData, { userId });
    }

    // 영화 수정
    @UseGuards(AuthGuard('access'))
    @Patch('/:movieId')
    updateMovie(
        @Param('movieId') movieId: number, //
        @Req() req: IAuthUser, //
        @Body() updateData: UpdateMovieDto,
    ): Promise<Movie> {
        const userId = Number(req.user.id);
        return this.moviesService.update({ movieId }, updateData, { userId });
    }

    // 영화 삭제
    @UseGuards(AuthGuard('access'))
    @Delete('/:movieId')
    deleteMovie(
        @Param('movieId') movieId: number, //
        @Req() req: IAuthUser, //
    ): Promise<boolean> {
        const userId = Number(req.user.id);
        return this.moviesService.delete({ movieId }, { userId });
    }
}
