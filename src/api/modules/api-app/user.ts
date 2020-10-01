import request from 'api/request';
import { AxiosRequestConfig } from 'axios';

interface User {
    id: number;
    name: string;
    avatar: string;
    email: string;
}

const apiUser = {
    getUserDetail: (): Promise<User> => request.get(`users/${15}`),
};

export default apiUser;
