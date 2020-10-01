import request from 'api/request';
import { AxiosRequestConfig } from 'axios';

export interface User {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    email: string;
}

const apiGeneral = {
    resources: (): Promise<any> => request.get(`/resources`),
    getUserDetail: (id: number): Promise<User> => request.get(`users/${id}`),
    getUsers: (config: AxiosRequestConfig): Promise<Array<User>> => request.get(`users`, config),
};

export default apiGeneral;
