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

    // @Min(0, { message: 'quantity must be a positive number' })
    // @IsNumber()
    readonly quantity: number; //

    // @Type(() => Number)
    // @Min(0, { message: 'totalAmount must be a positive number' })
    // @IsNumber()
    readonly totalAmount: number; //
}
