import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MoviesCategoriesService } from './moviesCategories.service';
import { MovieCategory } from './entities/moviesCategories.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('movies/category')
export class MoviesCategoriesController {
    constructor(
        private readonly moviesCategories: MoviesCategoriesService, //
    ) {}

    // 영화 카테고리 생성
    @Post()
    createCategory(@Body() createData: CategoryDto): Promise<MovieCategory> {
        return this.moviesCategories.create(createData);
    }

    // 영화 카테고리 수정
    @Patch('/:categoryId')
    updateCategory(
        @Param('categoryId') categoryId: number, //
        @Body() updateData: CategoryDto,
    ): Promise<MovieCategory> {
        return this.moviesCategories.update({ categoryId }, updateData);
    }

    // 영화 카테고리 삭제
    @Delete('/:categoryId')
    deleteCategory(
        @Param('categoryId') categoryId: number, //
    ): Promise<boolean> {
        return this.moviesCategories.delete({ categoryId });
    }
}
