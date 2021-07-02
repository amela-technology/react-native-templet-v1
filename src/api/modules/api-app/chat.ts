import request from 'api/request';

export const getMessage = (params: any) => request.get(`message`);
