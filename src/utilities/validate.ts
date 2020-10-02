export const validPhonePasswordEmail = (phone: string, pwd: string, email?: string): boolean => {
    if (!(phone && pwd)) {
        return false;
    }
    if (phone.length < 6 || pwd.length < 8 || pwd.length > 16) {
        return false;
    }
    if (email === '' && email.length < 2) {
        return false;
    }
    return true;
};

export const temp = null;
