import { Point } from './../payment/entities/point.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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

        @InjectRepository(Point)
        private readonly pointRepository: Repository<Point>,

        private readonly dataSource: DataSource,
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
    async create(
        reservationData: CreateReservationDto,
        userId: number,
    ): Promise<Reservation> {
        const { movieSlotId, moviesSeats, seatTypes } = reservationData;

        // 트랜젝션 시작
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // // 상영시간대(영화) 선택
            // const movie = await queryRunner.manager.findOne(MovieSlot, {
            //     where: { id: movieSlotId },
            //     relations: ['movie'],
            // });

            // 영화 가격 추출
            let moviePrice = 0;
            seatTypes === 'standard'
                ? (moviePrice = 20000)
                : (moviePrice = 25000);

            const quantity = Number(moviesSeats.length);
            const totalAmount = quantity * moviePrice;

            // 좌석 배열을 임시 배열에 넣고 좌석 테이블에 데이터 저장
            const temp = [];
            moviesSeats.forEach((el) => {
                temp.push({ seatNumber: el });
            });

            const newSeats = await this.seatsService.bulkInsert({
                names: temp,
            });
            const seats = [...newSeats.identifiers];

            // 해당 유저의 기존 잔여 포인트 조회
            const existPoint = await queryRunner.manager.findOne(Point, {
                where: {
                    user: {
                        id: userId,
                    },
                },
                order: { createdAt: 'DESC' },
                relations: ['user'],
            });

            // 영화 결제 -> 티켓가격만큼 차감 후 나머지 포인트 계산되어 포인트 테이블에 저장됨
            const updatedPoint = await this.pointRepository.create({
                user: {
                    id: userId,
                },
                minusPoint: totalAmount,
                balance: existPoint.balance - totalAmount,
            });

            await queryRunner.manager.save(updatedPoint);

            // 새로운 예약 로우 생성
            const createdReservation = await this.reservaionsRepository.create({
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
            await queryRunner.manager.save(createdReservation);
            await queryRunner.commitTransaction();

            return createdReservation;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    // // 예매 취소
    // async delete({ movieId }: IMovieServiceFindOne): Promise<boolean> {
    //     const result = await this.reservaionsRepository.softDelete({
    //         id: movieId,
    //     });
    //     return result.affected ? true : false;
    // }
}
