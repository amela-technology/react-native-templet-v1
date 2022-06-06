export interface TypeLogin {
    username: string;
    password: string;
}

export interface TypeRegister {
    name: string;
    gender: number;
    birthday: string;
    [key: string]: any;
}
