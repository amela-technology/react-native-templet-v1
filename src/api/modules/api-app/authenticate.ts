import request from 'api/request';

interface AuthenticateData {
    token: string;
    refreshToken: string;
}

export const login = (username: string, password: string): Promise<AuthenticateData> => {
    return request.post(`/login`, {
        username,
        password,
    });
};

export const temp = null;
