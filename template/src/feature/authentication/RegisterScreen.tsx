import { yupResolver } from '@hookform/resolvers/yup';
import { checkIsExistEmail, getVerifyCode } from 'api/modules/api-app/authenticate';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const RegisterScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);

    const registerSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password('password'),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const submit = async (user: any) => {
        const res = await checkIsExistEmail(user?.email);
        if (res?.data?.isExisted) {
            AlertMessage(t('error.emailExisted'));
            return;
        }
        await getVerifyCode(user?.email);
        navigate(AUTHENTICATE_ROUTE.SEND_OTP, { ...user, register: true });
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        name={'email'}
                        placeholder={t('authen.register.emailPlaceholder')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <StyledInputForm
                        name={'password'}
                        placeholder={t('authen.register.passwordPlaceholder')}
                        ref={passwordRef}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        maxLength={32}
                        onSubmitEditing={() => passwordConfirmRef.current.focus()}
                    />
                    <StyledInputForm
                        name={'confirmPassword'}
                        placeholder={t('authen.register.passwordPlaceholder')}
                        ref={passwordConfirmRef}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        maxLength={32}
                        onSubmitEditing={handleSubmit(submit)}
                    />
                </FormProvider>

                <StyledButton
                    onPress={handleSubmit(submit)}
                    title={'Confirm'}
                    customStyle={[styles.loginButton, !isValid && { backgroundColor: 'lightgray' }]}
                    disabled={!isValid}
                />
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
    },
});
export default RegisterScreen;
