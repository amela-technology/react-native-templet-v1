import request from 'api/request';

const apiGeneral = {
    resources: (): Promise<any> => request.get(`/resources`),
};

export default apiGeneral;
