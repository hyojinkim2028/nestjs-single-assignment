import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Movie, //
            User, //
        ]),
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [],
})
export class MoviesModule {}
