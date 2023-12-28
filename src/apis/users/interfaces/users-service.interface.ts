export interface IUsersServiceFindOneByEmail {
    email: string;
}

export interface IUsersServiceFindOneById {
    userId: number;
}

export interface IUsersServiceCreate {
    email: string;
    password: string;
    nickname: string;
}
