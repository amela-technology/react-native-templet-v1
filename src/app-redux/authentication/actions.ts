import { SET_USER_INFO, AuthenticationTypes, AuthenticationData } from './types';

const setUserInfo = (data: AuthenticationData): AuthenticationTypes => ({
    type: SET_USER_INFO,
    data,
});

export default setUserInfo;
