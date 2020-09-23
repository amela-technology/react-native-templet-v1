import request from 'api/request'

export const apiGeneral = {
    resources: (): Promise<any> => request.get(`/resources`),
}
