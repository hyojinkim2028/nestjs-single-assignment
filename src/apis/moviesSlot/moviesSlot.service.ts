import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieSlot } from './entities/moviesSlot.entity';
import { CreateSlotDto } from './dto/movieSlot-create.dto';
import { IMovieSlotServiceFindOne } from './interfaces/moviesSlot-service.interface';
import { UpdateSlotDto } from './dto/movieSlot-update.dto';

@Injectable()
export class MoviesSlotService {
    constructor(
        @InjectRepository(MovieSlot)
        private readonly moviesSlotRepository: Repository<MovieSlot>, //
    ) {}

    // 영화 상영시간대 전체 조회
    findAllSlot(): Promise<MovieSlot[]> {
        return this.moviesSlotRepository.find({
            relations: ['movie', 'movieRoom'],
        });
    }

    // 영화 상영시간 상세 조회

    async findOneSlot({
        slotId,
    }: IMovieSlotServiceFindOne): Promise<MovieSlot | string> {
        const slot = await this.moviesSlotRepository.findOne({
            where: { id: slotId },
            relations: ['movie', 'movieRoom'],
        });
        if (!slot) throw new NotFoundException('존재하지 않는 영화입니다.');
        return slot;
    }

    // 영화 생성
    async create(slotData: CreateSlotDto): Promise<MovieSlot> {
        const { movieId, movieRoomId, ...slot } = slotData;
        const createdSlot = this.moviesSlotRepository.save({
            ...slot,
            movie: {
                id: movieId,
            },
            movieRoom: {
                id: movieRoomId,
            },
        });
        return createdSlot;
    }

    // 영화 상영시간 수정
    async update(
        { slotId }: IMovieSlotServiceFindOne,
        updateData: UpdateSlotDto,
    ): Promise<MovieSlot> {
        const slot = await this.moviesSlotRepository.findOne({
            where: { id: slotId },
        });
        if (!slot)
            throw new NotFoundException('존재하지 않는 상영시간대 입니다');

        const { movieId, movieRoomId, ...data } = updateData;

        const result = this.moviesSlotRepository.save({
            ...slot,
            movie: {
                id: movieId,
            },
            movieRoom: {
                id: movieRoomId,
            },
            ...data,
        });
        return result;
    }

    // 영화 상영시간 삭제
    async delete({ slotId }: IMovieSlotServiceFindOne): Promise<boolean> {
        const result = await this.moviesSlotRepository.softDelete({
            id: slotId,
        });
        return result.affected ? true : false;
    }
}
