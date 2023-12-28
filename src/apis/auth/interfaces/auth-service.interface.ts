import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceLogin {
    email: string;
    password: string;
    res: Response;
}

export interface IAuthServiceSetRefreshToken {
    res: Response;
    user: User;
}

export interface IAuthServiceGetAccessToken {
    user: User;
}
