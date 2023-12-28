// auth.module 에 주입해주기
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰 검증
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    validate(payload) {
        return {
            id: payload.sub, // req.user, 토큰으로 만들었던 값 풀어서 리턴 { sub: user.id }
        };
    }
}
