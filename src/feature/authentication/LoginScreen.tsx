import { yupResolver } from '@hookform/resolvers/yup';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const LoginScreen: FunctionComponent = () => {
    const [user, setUser] = useState({ email: 'hoan.nguyen@amela.vn', password: '123123' });
    const passwordRef = useRef<any>(null);
    const { loading, requestLogin } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });

    const form = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });
    const {
        formState: { isValid },
    } = form;

    const doRegister = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER);
    };
    const goToForgotPassword = () => {
        navigate(AUTHENTICATE_ROUTE.FORGOT_PASS);
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
                        name="email"
                        defaultValue={user.email}
                        customPlaceHolder="login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={32}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <StyledInputForm
                        name="password"
                        defaultValue={user.password}
                        customPlaceHolder="login.placeholderPassword"
                        ref={passwordRef}
                        secureTextEntry
                        maxLength={20}
                    />
                </FormProvider>

                <StyledButton
                    onPress={() => requestLogin(user)}
                    title='authen.login.buttonLogin'
                    disabled={!isValid}
                    customStyle={styles.loginButton}
                />

                <StyledTouchable onPress={goToForgotPassword} customStyle={styles.registerButton}>
                    <StyledText i18nText='authen.login.forgotPasswordText' />
                </StyledTouchable>

                <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                    <StyledText i18nText='authen.login.registerText' />
                </StyledTouchable>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    loginButton: {
        marginTop: 20,
    },
    registerButton: {
        marginTop: 20,
    },
});

export default LoginScreen;
