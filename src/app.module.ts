import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { MoviesModule } from './apis/movies/movies.module';
import { MoviesCategoryModule } from './apis/moviesCategories/moviesCategories.module';
import { MoviesRoomsModule } from './apis/moviesRooms/moviesRooms.module';
import { MoviesSlotModule } from './apis/moviesSlot/moviesSlot.module';
import { ReservationsModule } from './apis/reservation/reservations.module';
// import Joi from 'joi';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        MoviesModule,
        MoviesCategoryModule,
        MoviesRoomsModule,
        MoviesSlotModule,
        ReservationsModule,
        ConfigModule.forRoot({
            // isGlobal: true,
            // validationSchema: Joi.object({
            //     SERVER_PORT: Joi.number().required,
            // }),
        }), // 환경변수 사용
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'], // entity가 들어가 있는 모든 파일 변환(확장자를 ts로 하면 js로 변환과정에서 오류)
            synchronize: true,
            logging: true,
        }),
    ],
    controllers: [],
})
export class AppModule {}
