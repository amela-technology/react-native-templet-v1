import i18next from 'i18next';
import * as yup from 'yup';
import { requireField } from './format';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    REGEX_EMAIL,
    REGEX_PASSWORD,
    REGEX_PHONE,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
} from './validate';

const yupValidate = {
    name: () =>
        yup
            .string()
            .required(() => requireField('name'))
            .trim(i18next.t('error.trimSpace'))
            .strict(true)
            .min(USERNAME_MIN_LENGTH, i18next.t('error.nameLength'))
            .max(USERNAME_MAX_LENGTH, i18next.t('error.nameLength')),

    email: () =>
        yup
            .string()
            .required(() => requireField('email'))
            .email(i18next.t('error.emailInvalid'))
            .matches(REGEX_EMAIL, i18next.t('error.emailInvalid')),

    phone: () =>
        yup
            .string()
            .required(() => requireField('phone'))
            .matches(REGEX_PHONE, i18next.t('error.phoneInvalid')),

    /**
     * @param ref : the name of StyledInputForm want to compare
     * @param isMatchCurrentPassword
     * password() : input password
     * password(ref) : input passwordConfirm, have to be the same with password
     * password(ref, false) : input newPassword, have not to be the same with currentPassword
     */
    password: (ref?: string, isMatchCurrentPassword = true): any => {
        if (ref) {
            // NEW PASSWORD
            if (!isMatchCurrentPassword)
                return yupValidate.password().not([yup.ref(ref), null], i18next.t('error.duplicatePassword'));

            // CONFIRM PASSWORD
            return yup
                .string()
                .required(() => requireField('passwordConfirm'))
                .oneOf([yup.ref(ref), null], i18next.t('error.passwordNotMatch'));
        }

        return yup
            .string()
            .required(() => requireField('password'))
            .trim(i18next.t('error.trimSpace'))
            .strict(true)
            .min(PASSWORD_MIN_LENGTH, i18next.t('error.passwordLength'))
            .max(PASSWORD_MAX_LENGTH, i18next.t('error.passwordLength'))
            .matches(REGEX_PASSWORD, i18next.t('error.validatePassword'));
    },
};

export default yupValidate;
