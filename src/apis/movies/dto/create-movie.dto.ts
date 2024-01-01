import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly title: string; //

    @IsString()
    readonly time: string; //

    @IsNumber()
    readonly theater: number; //

    @IsNumber()
    readonly price: number; //

    @IsNumber()
    readonly seats: number; //

    @IsNumber()
    readonly movieCategoryId: number; //
}
