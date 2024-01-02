import {
    Body,
    Controller,
    // Delete,
    Get,
    // Param,
    // Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/reservation-create.dto';
import { Reservation } from './entities/reservation.entity';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from '../users/interfaces/users-controller.interface';

@Controller('reservations')
export class ReservationsController {
    constructor(
        private readonly reservationsService: ReservationsService, //
    ) {}

    // 본인 예매 내역 전체 상세 조회
    @UseGuards(AuthGuard('access'))
    @Get()
    getAllMovies(@Req() req: IAuthUser): Promise<Reservation[]> {
        const userId = Number(req.user.id);
        return this.reservationsService.findAllMyReservation({ userId });
    }

    // // (본인)예매 내역 하나 조회
    // @UseGuards(AuthGuard('access'))
    // @Get('/:reservationId')
    // findOneById(
    //     @Param('reservationId') reservationId: number, //
    // ): Promise<Reservation | string> {
    //     return this.reservationsService.findOneMyReservation({ reservationId });
    // }

    // 예약 생성
    @Post()
    createReservation(
        @Body() reservationData: CreateReservationDto,
    ): Promise<Reservation> {
        return this.reservationsService.create(reservationData);
    }

    // // 영화 수정
    // @Patch('/:movieId')
    // updateMovie(
    //     @Param('movieId') movieId: number, //
    //     @Body() updateData: UpdateMovieDto,
    // ): Promise<Movie> {
    //     return this.moviesService.update({ movieId }, updateData);
    // }

    // // 영화 삭제
    // @Delete('/:movieId')
    // deleteMovie(
    //     @Param('movieId') movieId: number, //
    // ): Promise<boolean> {
    //     return this.moviesService.delete({ movieId });
    // }
}
