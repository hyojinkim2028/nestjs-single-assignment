import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from './interfaces/users-controller.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard('access'))
    @Get()
    getUserInfo(@Req() req: IAuthUser): Promise<User> {
        const userId = Number(req.user.id);
        return this.usersService.findUserById({ userId });
    }

    @Post()
    createUser(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('nickname') nickname: string,
    ): Promise<User> {
        return this.usersService.create({ email, password, nickname });
    }
}
