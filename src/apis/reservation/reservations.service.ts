import { Point } from './../payment/entities/point.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from './dto/reservation-create.dto';
import { Reservation } from './entities/reservation.entity';
import { MoviesSeatsService } from '../moviesSeats/movieSeat.service';
import { MovieSlot } from '../moviesSlot/entities/moviesSlot.entity';
import { IFindAllReservationsService } from './interfaces/reservations-service.interface';

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

            // 좌석을 선택하면 해당 좌석번호가 좌석테이블에 저장됨( 예약테이블 : 좌석테이블 = N : M )
            // 프론트에서 테이블에 저장되어있는 좌석번호에 대해 유저가 선택하지 못하도록 비활성화 처리
            // 예를들어 자리가 1~100 까지 있는데 1,2,3 번 자리가 예약되었다면 회색으로 표시를해서 클릭 비활성화되게 함.

            // 디테일하게 백엔드에서도 함께 처리하고 싶었지만 시간문제로 하지 못했습니다.

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

    // // 예매 취소 -> 구현 보류
    // async delete({ movieId }: IMovieServiceFindOne): Promise<boolean> {
    //     const result = await this.reservaionsRepository.softDelete({
    //         id: movieId,
    //     });
    //     return result.affected ? true : false;
    // }
}
