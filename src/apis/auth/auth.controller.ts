import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from '../users/interfaces/users-controller.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService, //
    ) {}

    @Post()
    login(
        @Body('email') email: string, //
        @Body('password') password: string, //
        @Res({ passthrough: true }) res: Response,
    ): Promise<string> {
        return this.authService.login({ email, password, res });
    }

    @Get()
    @UseGuards(AuthGuard('refresh'))
    restoreAccessToken(
        @Req() req: IAuthUser, //
    ) {
        const user = req.user;
        return this.authService.restoreAccessToken({ user });
    }
}
