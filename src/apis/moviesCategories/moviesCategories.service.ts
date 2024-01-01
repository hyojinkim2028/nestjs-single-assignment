import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieCategory } from './entities/moviesCategories.entity';
import { CategoryDto } from './dto/category.dto';
import { ICategoryServiceFindOne } from './interfaces/moviesCategory-service.interface';

@Injectable()
export class MoviesCategoriesService {
    constructor(
        @InjectRepository(MovieCategory)
        private readonly moviesCategoryRepository: Repository<MovieCategory>, //
    ) {}

    // 영화 카테고리 생성
    async create(createData: CategoryDto): Promise<MovieCategory> {
        const createCategory = this.moviesCategoryRepository.save({
            ...createData,
        });
        return createCategory;
    }

    // 영화 카테고리 수정
    async update(
        { categoryId }: ICategoryServiceFindOne,
        updateData: CategoryDto,
    ): Promise<MovieCategory> {
        const category = await this.moviesCategoryRepository.findOne({
            where: { id: categoryId },
        });

        const result = this.moviesCategoryRepository.save({
            ...category,
            ...updateData,
        });
        return result;
    }

    // 영화 카테고리 삭제
    async delete({ categoryId }: ICategoryServiceFindOne): Promise<boolean> {
        const result = await this.moviesCategoryRepository.softDelete({
            id: categoryId,
        });
        return result.affected ? true : false;
    }
}
