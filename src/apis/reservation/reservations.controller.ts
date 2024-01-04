import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
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

    // 예약 생성
    @UseGuards(AuthGuard('access'))
    @Post()
    createReservation(
        @Req() req: IAuthUser,
        @Body() reservationData: CreateReservationDto,
    ): Promise<Reservation> {
        const userId = Number(req.user.id);

        return this.reservationsService.create(reservationData, userId);
    }

    // 예약 취소 -> 구현 보류
    @UseGuards(AuthGuard('access'))
    @Delete('/:reservationId')
    deleteReservation(
        @Req() req: IAuthUser,
        @Param('reservationId') reservationId: number,
    ): Promise<string> {
        const userId = Number(req.user.id);
        return this.reservationsService.delete(userId, { reservationId });
    }
}
