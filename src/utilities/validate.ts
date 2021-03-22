import * as React from 'react';
import AlertMessage from 'components/base/AlertMessage';
import i18next from './i18next';

export const regexEmail = /^(([^<>()[\]\\x.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const validateEmail = (email: string) => {
    if (email.trim() === '') {
        AlertMessage(i18next.t('validateMessage.emailEmpty'));
        return false;
    }
    if (!regexEmail.test(String(email).toLowerCase())) {
        AlertMessage(i18next.t('validateMessage.emailInvalid'));
        return false;
    }
    return true;
};

export const validatePassword = (password: string) => {
    if (!password || password?.length < 6) {
        AlertMessage(i18next.t('alert.message.pswTooShort'));
        return false;
    }
    return true;
};

export const validateRegister = (props: any) => {
    if (!validateEmail(props.email)) {
        AlertMessage(i18next.t('validateMessage.emailInvalid'));
        return false;
    }
    if (!validatePassword(props.password)) {
        AlertMessage(i18next.t('alert.message.pswTooShort'));
        return false;
    }
    if (props.password !== props.comfirmPassword) {
        AlertMessage(i18next.t('validateMessage.passwordNotMatch'));
        return false;
    }
    return true;
};
