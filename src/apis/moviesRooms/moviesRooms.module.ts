import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRoom } from './entities/movieRoom.entity';
import { MoviesRoomsController } from './moviesRooms.controller';
import { MoviesRoomsService } from './moviesRooms.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MovieRoom, //
        ]),
    ],
    controllers: [MoviesRoomsController],
    providers: [MoviesRoomsService],
    exports: [],
})
export class MoviesRoomsModule {}
