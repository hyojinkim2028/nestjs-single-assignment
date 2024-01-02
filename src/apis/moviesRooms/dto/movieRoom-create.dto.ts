import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
    // 관람관 이름
    @IsString()
    readonly roomName: string; //

    // 스페셜타입 좌석수
    @IsNumber()
    readonly specialSeats: number; //

    // 스탠다드타입 좌석수
    @IsNumber()
    readonly standardSeats: number; //
}
