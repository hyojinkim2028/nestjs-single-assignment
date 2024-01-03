import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieImage } from '../moviesImages/entities/movieImage.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Movie, //
            MovieImage, //
            User, //
        ]),
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [],
})
export class MoviesModule {}
