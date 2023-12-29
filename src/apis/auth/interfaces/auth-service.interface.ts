import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser } from 'src/apis/users/interfaces/users-controller.interface';

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
    user: User | IAuthUser['user'];
}

export interface IAuthServiceRestoreAccessToken {
    user: IAuthUser['user'];
}
