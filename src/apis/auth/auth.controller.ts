import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
}
