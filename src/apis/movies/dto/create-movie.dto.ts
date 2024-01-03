import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly image: string; //

    @IsString()
    readonly title: string; //

    @IsString()
    readonly runTime: number; //

    @IsNumber()
    readonly movieCategoryId: number; //
}
