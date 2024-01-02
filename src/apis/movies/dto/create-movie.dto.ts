import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly title: string; //

    @IsString()
    readonly runTime: number; //

    @IsNumber()
    readonly price: number; //

    @IsNumber()
    readonly movieCategoryId: number; //
}
