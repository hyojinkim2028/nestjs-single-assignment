import { IsNumber, IsString } from 'class-validator';

export class CreateSlotDto {
    // 상영날짜
    @IsString()
    readonly date: string; //

    // 영화시작시간
    @IsNumber()
    readonly startTime: number; //

    // 영화종료시간
    @IsNumber()
    readonly finishTime: number; //

    @IsNumber()
    readonly movieId: number; //

    @IsNumber()
    readonly movieRoomId: number; //
}
