import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesSlotController } from './moviesSlot.controller';
import { MoviesSlotService } from './moviesSlot.service';
import { MovieSlot } from './entities/moviesSlot.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MovieSlot, //
        ]),
    ],
    controllers: [MoviesSlotController],
    providers: [MoviesSlotService],
    exports: [],
})
export class MoviesSlotModule {}
