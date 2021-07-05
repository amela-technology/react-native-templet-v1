import { checkVerifyCode, forgotPassword, getVerifyCode, register } from 'api/modules/api-app/authenticate';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import { logger } from 'utilities/helper';

const SendOTP: FunctionComponent = ({ route }: any) => {
    const [code, setCode] = useState('');
    const { t } = useTranslation();
    const { email, password } = route?.params;
    const onCodeFilled = (codeVer: string) => {
        setCode(codeVer);
    };

    const confirm = async () => {
        try {
            if (code?.length < 5) {
                AlertMessage(t('alert.invalidOTP'));
                return;
            }
            if (route?.params?.register) {
                const response = await register({ email, password, verifiedCode: code });
                const data = {
                    ...response,
                    user: { email, isSave: true },
                };
                AuthenticateService.handlerLogin(data);
            } else {
                const verifyCode = await checkVerifyCode(email, code);
                if (verifyCode?.data?.isValid) {
                    navigate(AUTHENTICATE_ROUTE.CHANGE_PASS, { email, code });
                } else {
                    AlertMessage(t('alert.invalidOTP'));
                }
            }
        } catch (error) {
            logger(error);
            AlertMessage(error);
        }
    };

    const resendOTP = async () => {
        try {
            if (route?.params?.register) {
                await getVerifyCode(email);
                AlertMessage(t('alert.success'));
                return;
            }
            await forgotPassword(email);
            AlertMessage(t('alert.success'));
        } catch (error) {
            AlertMessage(error);
        }
    };

    return (
        <SafeAreaView style={styles.flex1}>
            <KeyboardAwareScrollView enableOnAndroid={true} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <CodeInput
                        keyboardType="numeric"
                        space={10}
                        size={30}
                        activeColor={Themes.COLORS.black}
                        containerStyle={styles.otpInput}
                        codeInputStyle={styles.underlineStyleBase}
                        onFulfill={onCodeFilled}
                    />
                    <StyledTouchable onPress={resendOTP} customStyle={styles.containerResend}>
                        <StyledText customStyle={styles.resend} i18nText="common.sendOTP.resend" />
                    </StyledTouchable>
                    <StyledButton
                        customStyle={styles.flex1}
                        title={
                            route?.params.register ? 'common.sendOTP.sendForgotPassword' : 'common.sendOTP.buttonNext'
                        }
                        onPress={confirm}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    otpInput: {
        width: '100%',
        flex: 1,
        marginVertical: 10,
    },
    underlineStyleBase: {
        width: 45,
        height: 55,
        borderColor: Themes.COLORS.black,
        borderRadius: 15,
        color: Themes.COLORS.black,
        marginHorizontal: 20,
    },
    containerResend: {
        width: '100%',
        flex: 1,
        marginTop: 30,
    },
    resend: {
        textDecorationLine: 'underline',
        textDecorationColor: Themes.COLORS.black,
        color: Themes.COLORS.black,
        textAlign: 'right',
        width: '100%',
    },
    flex1: {
        flex: 1,
    },
});

export default SendOTP;
