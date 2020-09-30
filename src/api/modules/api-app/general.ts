import request from 'api/request';

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
};

export default apiGeneral;
