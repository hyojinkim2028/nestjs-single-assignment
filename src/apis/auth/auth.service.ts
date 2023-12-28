import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
    IAuthServiceGetAccessToken,
    IAuthServiceLogin,
    IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService, //
        private readonly jwtService: JwtService, //
    ) {}

    async login({ email, password, res }: IAuthServiceLogin): Promise<string> {
        const user = await this.usersService.findOneByEmail({ email });
        if (!user)
            throw new UnprocessableEntityException(
                '존재하지 않는 이메일입니다.',
            );

        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

        // 리프레시토큰 만들어 브라우저 쿠키에 저장해 보내줌
        this.setRefreshToken({ user, res });

        // // 배포환경
        // response.setHeader(
        //     'set-Cookie',
        //     `refreshToken = ${refreshToken}; path=/; domain=.사이트이름.com; SameSite=None; Secure; httpOnly`,
        // );
        // response.setHeader('Access-Control-Allow-Origin', 'https://사이트이름.com')

        return this.getAccessToken({ user });
    }

    // 리프레시토큰 만들어주는 함수
    setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
        // 리프레시토큰 생성
        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' },
        );

        res.cookie('set-Cookie', refreshToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
        });
    }

    // 엑세스토큰 만들어주는 함수
    getAccessToken({ user }: IAuthServiceGetAccessToken): string {
        return this.jwtService.sign(
            { sub: user.id },
            { secret: process.env.SECRET_KEY, expiresIn: '1h' },
        );
    }
}
