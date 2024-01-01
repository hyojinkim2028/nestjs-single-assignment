import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MoviesRoomsService } from './moviesRooms.service';
import { CreateRoomDto } from './dto/movieRoom-create.dto';
import { MovieRoom } from './entities/movieRoom.entity';
import { UpdateRoomDto } from './dto/movieRoom-update.dto';

@Controller('rooms')
export class MoviesRoomsController {
    constructor(
        private readonly moviesRoomsService: MoviesRoomsService, //
    ) {}

    // 관람관 전체 조회 -> 조회오류 확인하기
    @Get()
    getAllRooms(): Promise<MovieRoom[]> {
        return this.moviesRoomsService.findAllRooms();
    }

    // 관람관 상세 조회
    @Get('/:roomId')
    findOneById(
        @Param('roomId') roomId: number, //
    ): Promise<MovieRoom | string> {
        return this.moviesRoomsService.findOneRoom({ roomId });
    }

    // 관람관 생성
    @Post()
    createRoom(@Body() roomData: CreateRoomDto): Promise<MovieRoom> {
        return this.moviesRoomsService.create(roomData);
    }

    // 관람관 수정
    @Patch('/:roomId')
    updateMovie(
        @Param('roomId') roomId: number, //
        @Body() updateData: UpdateRoomDto,
    ): Promise<MovieRoom> {
        return this.moviesRoomsService.update({ roomId }, updateData);
    }

    // 관람관 삭제
    @Delete('/:roomId')
    deleteMovie(
        @Param('roomId') roomId: number, //
    ): Promise<boolean> {
        return this.moviesRoomsService.delete({ roomId });
    }
}
