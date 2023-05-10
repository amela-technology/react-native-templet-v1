import { AxiosRequestConfig } from 'axios';

export interface TypeLoginRequest extends AxiosRequestConfig {
    username: string;
    password: string;
}

export interface TypeSignUp {
    username: string;
    password: string;
    confirmPassword: string;
}
