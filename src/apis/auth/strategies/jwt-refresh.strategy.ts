// auth.module 에 주입해주기
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                console.log(req);
                const temp = req.headers.cookie;
                const refreshToken = temp.replace('refreshToken= ', '');
                return refreshToken;
            },
            secretOrKey: process.env.REFRESH_SECRET_KEY,
        });
    }

    validate(payload) {
        return {
            id: payload.sub, // req.user, 토큰으로 만들었던 값 풀어서 리턴 { sub: user.id }
        };
    }
}
