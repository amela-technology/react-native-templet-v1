import { StyledButton, StyledInput, StyledText, StyledTouchable } from 'components/base';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLogin } from 'utilities/authenticate/AuthenticateService';

const LoginScreen: FunctionComponent = () => {
    const [user, setUser] = useState({ email: 'hoan.nguyen@amela.vn', password: '123123' });
    const passwordRef = useRef<any>(null);
    const { t } = useTranslation();
    const { loading, requestLogin } = useLogin();
    const onChangeEmail = (text: string) => {
        setUser({ ...user, email: text });
    };
    const onChangePassword = (text: string) => {
        setUser({ ...user, password: text });
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
        >
            <SafeAreaView style={styles.body}>
                <StyledInput
                    value={user.email}
                    onChangeText={onChangeEmail}
                    placeholder={t('login.placeholderEmail')}
                    keyboardType="email-address"
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <StyledInput
                    value={user.password}
                    onChangeText={onChangePassword}
                    placeholder={t('login.placeholderPassword')}
                    ref={passwordRef}
                    secureTextEntry={true}
                    maxLength={32}
                />
                <StyledButton onPress={() => requestLogin(user)} title={'Log in'} customStyle={styles.loginButton} />
                <StyledTouchable onPress={goToForgotPassword} customStyle={styles.registerButton}>
                    <StyledText originValue={'Quên mật khẩu'} />
                </StyledTouchable>
                <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                    <StyledText originValue={'Đăng ký'} />
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
