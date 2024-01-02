import { Reservation } from './entities/reservation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { MovieSeat } from '../moviesSeats/entities/movieSeat.entity';
import { MoviesSeatsService } from '../moviesSeats/movieSeat.service';
import { MovieSlot } from '../moviesSlot/entities/moviesSlot.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Reservation, //
            MovieSeat, //
            MovieSlot,
        ]),
    ],
    controllers: [ReservationsController],
    providers: [
        ReservationsService, //
        MoviesSeatsService,
    ],
    exports: [],
})
export class ReservationsModule {}
