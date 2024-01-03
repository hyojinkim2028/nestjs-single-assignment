import { IsArray, IsNumber, IsString } from 'class-validator';
import { Seat } from '../entities/reservation.entity';

export class CreateReservationDto {
    // // 유저정보
    // @IsNumber()
    // readonly userId: number; //

    // 좌석타입
    @IsString()
    readonly seatTypes: Seat; //

    // 선택한 좌석
    // @Type(() => Number)
    @IsArray()
    readonly moviesSeats: number[]; //

    @IsNumber()
    readonly movieSlotId: number; //

    readonly quantity: number; //

    readonly totalAmount: number; //
}
