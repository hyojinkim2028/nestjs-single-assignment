import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
    // 관람관 이름
    @IsString()
    readonly roomName: string; //

    // 스페셜타입 자리 행
    @IsNumber()
    readonly specialRow: number; //

    // 스페셜타입 자리 열
    @IsNumber()
    readonly specialCal: number; //

    // 스탠다드타입 자리 행
    @IsNumber()
    readonly standardRow: number; //

    // 스탠다드타입 자리 열
    @IsNumber()
    readonly standardCal: number; //
}
