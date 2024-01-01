import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesCategoriesController } from './moviesCategories.controller';
import { MoviesCategoriesService } from './moviesCategories.service';
import { MovieCategory } from './entities/moviesCategories.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MovieCategory, //
        ]),
    ],
    controllers: [MoviesCategoriesController],
    providers: [MoviesCategoriesService],
    exports: [],
})
export class MoviesCategoryModule {}
