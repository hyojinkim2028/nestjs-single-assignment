import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Movie, //
        ]),
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
    exports: [],
})
export class MoviesModule {}
