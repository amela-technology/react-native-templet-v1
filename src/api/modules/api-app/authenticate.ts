import request from 'api/request';

interface AuthenticateData {
    token: string;
    refreshToken: string;
}

const apiAuthenticate = {
    login: (username: string, password: string): Promise<AuthenticateData> =>
        request.post(
            `/login`,
            {
                username,
                password,
            },
            {
                headers: { Accept: '*/*' },
            },
        ),
};

export default apiAuthenticate;
