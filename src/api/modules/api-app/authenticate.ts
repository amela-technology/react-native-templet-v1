import request from 'api/request';

export const getProfile = (token?: string) =>
    request.get(`profile`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const login = (params: any) => request.post(`auth/login`, params);
export const register = (params: any) => request.post(`auth/register`, params);
export const forgotPassword = (email: string) => request.post(`auth/forgot-password`, { email });
export const checkIsExistEmail = (email: string) => request.post(`auth/check-account-existed`, { email });
export const getVerifyCode = (email: string) => request.post(`auth/request-verified-code`, { email });
export const checkVerifyCode = (email: string, verifiedCode: string) =>
    request.post(`auth/check-verified-code`, { email, verifiedCode });
export const resetPassword = (email: string, newPassword: string, verifiedCode: number) =>
    request.post(`auth/reset-password`, { email, newPassword, verifiedCode });
