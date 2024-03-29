import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
    imports: [
        JwtModule.register({}), //
        UsersModule, //
    ],
    controllers: [
        AuthController, //
    ],
    providers: [
        JwtAccessStrategy, //
        JwtRefreshStrategy, //
        AuthService, //
    ],
})
export class AuthModule {}
