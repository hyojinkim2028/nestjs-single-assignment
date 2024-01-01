import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMovieRoomServiceFindOne } from './interfaces/moviesRooms-service.interface';
import { CreateRoomDto } from './dto/movieRoom-create.dto';
import { MovieRoom } from './entities/movieRoom.entity';
import { UpdateRoomDto } from './dto/movieRoom-update.dto';

@Injectable()
export class MoviesRoomsService {
    constructor(
        @InjectRepository(MovieRoom)
        private readonly moviesRoomsRepository: Repository<MovieRoom>, //
    ) {}

    // 관람관 전체 조회
    findAllRooms(): Promise<MovieRoom[]> {
        return this.moviesRoomsRepository.find();
    }

    // 관람관 상세 조회
    async findOneRoom({
        roomId,
    }: IMovieRoomServiceFindOne): Promise<MovieRoom | string> {
        const room = await this.moviesRoomsRepository.findOne({
            where: { id: roomId },
        });
        if (!room) return '존재하지 않는 영화입니다.';
        return room;
    }

    // 관람관 생성
    async create(roomData: CreateRoomDto): Promise<MovieRoom> {
        const createdRoom = await this.moviesRoomsRepository.save({
            ...roomData,
        });
        return createdRoom;
    }

    // 관람관 수정
    async update(
        { roomId }: IMovieRoomServiceFindOne,
        updateData: UpdateRoomDto,
    ): Promise<MovieRoom> {
        const room = await this.moviesRoomsRepository.findOne({
            where: { id: roomId },
        });
        if (!room) throw new NotFoundException('존재하지 않는 영화입니다');

        const result = this.moviesRoomsRepository.save({
            ...room,
            ...updateData,
        });
        return result;
    }

    // 관람관 삭제
    async delete({ roomId }: IMovieRoomServiceFindOne): Promise<boolean> {
        const result = await this.moviesRoomsRepository.softDelete({
            id: roomId,
        });
        return result.affected ? true : false;
    }
}
