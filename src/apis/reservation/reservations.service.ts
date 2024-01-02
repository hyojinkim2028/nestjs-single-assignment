import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/reservation-create.dto';
import { Reservation } from './entities/reservation.entity';
import { MoviesSeatsService } from '../moviesSeats/movieSeat.service';
import { MovieSlot } from '../moviesSlot/entities/moviesSlot.entity';
import {
    IFindAllReservationsService,
    // IFindOneReservationsService,
} from './interfaces/reservations-service.interface';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservaionsRepository: Repository<Reservation>, //

        private readonly seatsService: MoviesSeatsService, //

        @InjectRepository(MovieSlot)
        private readonly moviesSlotRepository: Repository<MovieSlot>, //
    ) {}

    // 본인 예매 전체 상세 조회
    findAllMyReservation({
        userId,
    }: IFindAllReservationsService): Promise<Reservation[]> {
        const reservations = this.reservaionsRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: ['movieSlot', 'moviesSeats'],
        });
        return reservations;
    }

    // // 본인 예매 아이디별 상세 조회
    // async findOneMyReservation({
    //     reservationId,
    // }: IFindOneReservationsService): Promise<Reservation | string> {
    //     const movie = await this.reservaionsRepository.findOne({
    //         where: { id: reservationId },
    //         relations: ['movieSlot', 'moviesSeats'],
    //     });
    //     if (!movie) return '존재하지 않는 예약입니다.';
    //     return movie;
    // }

    // 예약 생성
    async create(reservationData: CreateReservationDto): Promise<Reservation> {
        const { userId, movieSlotId, moviesSeats, seatTypes } = reservationData;

        const movie = await this.moviesSlotRepository.findOne({
            where: { id: movieSlotId },
            relations: ['movie'],
        });

        let moviePrice = Number(movie.movie.price);
        seatTypes === 'standard'
            ? (moviePrice = moviePrice)
            : (moviePrice = moviePrice + 5000);

        const quantity = Number(moviesSeats.length);
        const totalAmount = quantity * moviePrice;

        // const prevReservation = await this.reservaionsRepository.find({
        //     where: { id: movieSlotId },
        // });

        const temp = [];
        moviesSeats.forEach((el) => {
            temp.push({ seatNumber: el });
        });

        const newSeats = await this.seatsService.bulkInsert({ names: temp });
        const seats = [...newSeats.identifiers];

        // 일치하지 않는 경우 예약 가능
        const createdReservation = await this.reservaionsRepository.save({
            user: {
                id: userId,
            },
            seatTypes,
            movieSlot: {
                id: movieSlotId,
            },
            moviesSeats: seats,
            quantity,
            totalAmount,
        });
        return createdReservation;
    }
    // // 예매 수정
    // async update(
    //     { movieId }: IMovieServiceFindOne,
    //     updateData: UpdateMovieDto,
    // ): Promise<Movie> {
    //     const movie = await this.reservaionsRepository.findOne({
    //         where: { id: movieId },
    //     });
    //     if (!movie)
    //         throw new UnprocessableEntityException('존재하지 않는 영화입니다');

    //     const { movieCategoryId, ...data } = updateData;

    //     const result = this.reservaionsRepository.save({
    //         ...movie,
    //         movieCategory: {
    //             id: movieCategoryId,
    //         },
    //         ...data,
    //     });
    //     return result;
    // }

    // // 예매 취소
    // async delete({ movieId }: IMovieServiceFindOne): Promise<boolean> {
    //     const result = await this.reservaionsRepository.softDelete({
    //         id: movieId,
    //     });
    //     return result.affected ? true : false;
    // }
}
