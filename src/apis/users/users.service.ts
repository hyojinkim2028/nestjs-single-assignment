import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
    IUsersServiceCreate,
    IUsersServiceFindOneByEmail,
    IUsersServiceFindOneById,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';
import { Point } from '../payment/entities/point.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Point)
        private readonly pointRepository: Repository<Point>,
    ) {}

    // 유저정보, 잔여포인트 조회
    async findUserById({
        userId,
    }: IUsersServiceFindOneById): Promise<[User, number]> {
        const [user, point] = await Promise.all([
            this.usersRepository.findOne({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    nickname: true,
                    createdAt: true,
                },
            }),
            this.pointRepository
                .createQueryBuilder('point')
                .leftJoin('point.user', 'user')
                .where('user.id = :userId', { userId })
                .orderBy('point.createdAt', 'DESC') // 최신순 정렬
                .limit(1) // 최신 값 하나만 가져오기
                .getOne(),
        ]);

        return [user, point.balance];
    }
    // const balance = withPoint[0].balance;

    findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create({
        email,
        password,
        nickname,
    }: IUsersServiceCreate): Promise<User> {
        const user = await this.findOneByEmail({ email });

        if (user) throw new ConflictException('이미 등록된 이메일입니다.');

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = this.usersRepository.save({
            email,
            password: hashedPassword,
            nickname,
        });

        const newUserId = (await createdUser).id;
        await this.pointRepository.save({
            user: {
                id: newUserId,
            },
            plusPoint: 1000000,
            balance: 1000000,
        });

        return createdUser;
    }
}
