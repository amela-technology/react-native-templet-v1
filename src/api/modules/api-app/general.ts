import request from 'api/request';

export const getInit = (): Promise<any> => request.get(`/init`);
export const getResources = (): Promise<any> => request.get(`/resources`);
export const uploadImage = (formData: any): Promise<any> => request.post(`upload/image`, formData);
