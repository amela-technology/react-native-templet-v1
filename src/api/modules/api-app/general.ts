import request from 'api/request';
import { AxiosRequestConfig } from 'axios';

export interface User {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    email: string;
}

export const getResources = (): Promise<any> => request.get(`/resources`);
export const getUserDetail = (id: number): Promise<User> => request.get(`users/${id}`);
export const getUsers = (config: AxiosRequestConfig): Promise<Array<User>> => request.get(`users`, config);
