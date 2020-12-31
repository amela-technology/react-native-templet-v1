import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StyledButton, StyledInput, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { validateRegister } from 'utilities/validate';
import { checkIsExistEmail, getVerifyCode } from 'api/modules/api-app/authenticate';
import AlertMessage from 'components/base/AlertMessage';

const RegisterScreen: React.FunctionComponent = () => {
    const [user, setUser] = useState({ email: '', password: '', comfirmPassword: '' });
    const passwordRef = useRef<any>(null);
    const passworComfirmdRef = useRef<any>(null);
    const { t } = useTranslation();
    const onChangeEmail = (text: string) => {
        setUser({ ...user, email: text });
    };
    const onChangePassword = (text: string) => {
        setUser({ ...user, password: text });
    };
    const onChangeComfirmPassword = (text: string) => {
        setUser({ ...user, comfirmPassword: text });
    };
    const submit = async () => {
        if (!validateRegister(user)) {
            return;
        }
        const res = await checkIsExistEmail(user?.email);
        if (res?.data?.isExisted) {
            AlertMessage(t('errorMessage.emailExisted'));
            return;
        }
        await getVerifyCode(user?.email);
        navigate(AUTHENTICATE_ROUTE.SENDOTP, { ...user, register: true });
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
                    placeholder={t('register.emailPlaceholder')}
                    keyboardType="email-address"
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef.current.focus()}
                />
                <StyledInput
                    value={user.password}
                    onChangeText={onChangePassword}
                    placeholder={t('registerAccount.passwordPlaceholder')}
                    ref={passwordRef}
                    secureTextEntry={true}
                    returnKeyType={'next'}
                    maxLength={32}
                    onSubmitEditing={() => passworComfirmdRef.current.focus()}
                />
                <StyledInput
                    value={user.comfirmPassword}
                    onChangeText={onChangeComfirmPassword}
                    placeholder={t('registerAccount.passwordPlaceholder')}
                    ref={passworComfirmdRef}
                    secureTextEntry={true}
                    returnKeyType={'next'}
                    maxLength={32}
                    onSubmitEditing={submit}
                />
                <StyledButton onPress={submit} title={'Comfirm'} customStyle={styles.loginButton} />
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
export default RegisterScreen;
