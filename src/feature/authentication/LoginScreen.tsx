import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM: any = {
    email: 'hoan.nguyen@amela.vn',
    password: '123123123',
};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const { requestLogin, loading } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
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
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <StyledOverlayLoading visible={loading} />
            <SafeAreaView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        name="email"
                        customPlaceHolder="authen.login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={32}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <StyledInputForm
                        name="password"
                        customPlaceHolder="authen.login.placeholderPassword"
                        ref={passwordRef}
                        secureTextEntry
                        returnKeyType="done"
                        maxLength={20}
                    />
                </FormProvider>

                <StyledButton
                    onPress={handleSubmit(requestLogin)}
                    title="authen.login.buttonLogin"
                    disabled={!isValid}
                    customStyle={[
                        styles.loginButton,
                        { backgroundColor: isValid ? `rgba(252, 177, 3, 1)` : `rgba(252, 177, 3, 0.5)` },
                    ]}
                />

                <StyledTouchable onPress={goToForgotPassword} customStyle={styles.registerButton}>
                    <StyledText i18nText="authen.login.forgotPasswordText" />
                </StyledTouchable>

                <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                    <StyledText i18nText="authen.login.registerText" />
                </StyledTouchable>
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
        borderWidth: 0,
    },
    registerButton: {
        marginTop: 20,
    },
    errorMessage: {
        color: Themes.COLORS.borderInputError,
    },
});

export default LoginScreen;
