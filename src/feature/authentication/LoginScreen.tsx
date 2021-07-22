import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const { loading, requestLogin } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });

    const form = useForm({
        mode: 'all',
        resolver: yupResolver(yupSchema),
        defaultValues: { email: 'hoan.nguyen@amela.vn', password: '123123123' },
    });
    const {
        formState: { isValid, errors },
        setValue,
        getValues,
        handleSubmit,
    } = form;

    const onChangeText = (field: 'email' | 'password', text: string) => {
        setValue(field, text, {
            shouldValidate: true,
        });
    };
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
            enableResetScrollToCoords={false}
        >
            <SafeAreaView style={styles.body}>
                <FormProvider {...form}>
                    <StyledInputForm
                        name="email"
                        value={getValues().email}
                        customPlaceHolder="authen.login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={32}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        onChangeText={(text: string) => onChangeText('email', text)}
                    />
                    {errors?.email ? (
                        <StyledText
                            customStyle={styles.errorMessage}
                            originValue={errors?.email?.message || ''}
                        />
                    ) : (
                            <View />
                        )}

                    <StyledInputForm
                        name="password"
                        value={getValues().password}
                        customPlaceHolder="authen.login.placeholderPassword"
                        ref={passwordRef}
                        secureTextEntry
                        maxLength={20}
                        onChangeText={(text: string) => onChangeText('password', text)}
                    />
                    {errors?.password ? (
                        <StyledText
                            customStyle={styles.errorMessage}
                            originValue={errors?.password?.message || ''}
                        />
                    ) : (
                            <View />
                        )}

                </FormProvider>

                <StyledButton
                    onPress={handleSubmit(requestLogin)}
                    title='authen.login.buttonLogin'
                    disabled={!isValid}
                    customStyle={[styles.loginButton, { backgroundColor: isValid ? `rgba(252, 177, 3, 1)` : `rgba(252, 177, 3, 0.5)` }]}
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
    }
});

export default LoginScreen;
