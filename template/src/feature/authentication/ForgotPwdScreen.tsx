/* eslint-disable @typescript-eslint/no-unused-vars */
import { forgotPassword } from 'api/modules/api-app/authenticate';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { requireField } from 'utilities/format';
import { isIos } from 'utilities/helper';
import { REGEX_EMAIL } from 'utilities/validate';

const SendEmailScreen: FunctionComponent = ({ route }: any) => {
    const { t } = useTranslation();
    const form = useForm({
        mode: 'all',
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = form;
    const confirm = async ({ email }: any) => {
        try {
            await forgotPassword(email);
            navigate(AUTHENTICATE_ROUTE.SEND_OTP, { email });
        } catch (error) {
            AlertMessage(error);
        }
    };
    return (
        <SafeAreaView style={styles.flex1}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    enableOnAndroid={true}
                    enableAutomaticScroll={isIos}
                    showsVerticalScrollIndicator={false}
                >
                    <StyledInputForm
                        name={'email'}
                        placeholder={t('authen.register.emailPlaceholder')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={handleSubmit(confirm)}
                        form={form}
                        rules={{
                            pattern: {
                                value: REGEX_EMAIL,
                                message: 'error.emailInvalid',
                            },
                            required: requireField('Email'),
                        }}
                    />
                    <StyledButton
                        title={'authen.sendEmail.sendButtonTitle'}
                        onPress={handleSubmit(confirm)}
                        customStyle={[styles.buttonSave, !isValid && { backgroundColor: 'lightgray' }]}
                        disabled={!isValid}
                    />
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    titleStyleSaveButton: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    flex1: {
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
    },
    content: {
        backgroundColor: Themes.COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 30,
        marginTop: 15,
        marginBottom: 30,
        paddingVertical: 40,
    },
    header: {
        marginVertical: 10,
    },
    buttonSave: {
        marginTop: 20,
    },
});
export default SendEmailScreen;
