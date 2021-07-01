import * as yup from 'yup';
import { requireField } from './format';
import {
    REGEX_EMAIL,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    REGEX_PASSWORD,
} from './validate';

const yupValidate = () => {
    const nickName = () =>
        yup
            .string()
            .required(() => requireField('nickName'))
            .trim('Input cannot have space in start and end')
            .strict(true)
            .min(USERNAME_MIN_LENGTH, 'Only have from 5 to 10 characters')
            .max(USERNAME_MAX_LENGTH, 'Only have from 5 to 10 characters');

    const email = () =>
        yup
            .string()
            .required(() => requireField('email'))
            .email('Email is invalid')
            .matches(REGEX_EMAIL, 'Email is invalid');

    /**
     * @param ref : the name of StyledInputForm want to compare
     * @param isMatch
     * password() : input password
     * password(ref) : input confirmPass, have to be the same with password
     * password(ref, false) : input newPass, have not to be the same with oldPassword
     */
    const password = (ref?: string, isMatch = true): any => {
        if (ref) {
            // NEW PASSWORD
            if (!isMatch) return password().not([yup.ref(ref), null], 'Duplicate pass');

            // CONFIRM PASSWORD
            return yup
                .string()
                .required(() => requireField('confirmPass'))
                .oneOf([yup.ref(ref), null], 'Password notMatch');
        }

        return yup
            .string()
            .required(() => requireField('password'))
            .trim('Input cannot have space in start and end')
            .strict(true)
            .min(PASSWORD_MIN_LENGTH, 'Pass only have 8 to 17 characters')
            .max(PASSWORD_MAX_LENGTH, 'Pass only have 8 to 17 characters')
            .matches(REGEX_PASSWORD, 'Password is invalid');
    };

    return {
        nickName,
        email,
        password,
    };
};

export default yupValidate;
