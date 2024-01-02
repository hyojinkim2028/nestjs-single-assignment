import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieSeat } from './entities/movieSeat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ISeatsServiceBulkInsert } from './interfaces/moviesSeats-service.interface';

@Injectable()
export class MoviesSeatsService {
    constructor(
        @InjectRepository(MovieSeat)
        private readonly seatsRepository: Repository<MovieSeat>,
    ) {}
    // findBySeatNumber() {

    // }

    bulkInsert({ names }: ISeatsServiceBulkInsert) {
        return this.seatsRepository.insert(names);
    }
}
