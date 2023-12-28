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

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    findUserById({ userId }: IUsersServiceFindOneById): Promise<User> {
        const user = this.usersRepository.findOne({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                nickname: true,
                createdAt: true,
            },
        });
        return user;
    }

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

        return this.usersRepository.save({
            email,
            password: hashedPassword,
            nickname,
        });
    }
}
