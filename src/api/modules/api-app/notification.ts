import request from 'api/request';
import { TypeParamsPaging } from '../interface/common';

export const notificationList = ({ params }: TypeParamsPaging) => request.post(`notification`, params);
export const notificationCheck = () => request.get(`notification`);
export const notificationRead = (id: number) => request.put(`notification/read/${id}`);
