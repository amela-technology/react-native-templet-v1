import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassword } from 'api/modules/api-app/authenticate';
import { Themes } from 'assets/themes';
import { StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isIos } from 'utilities/helper';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const ChangePassword: FunctionComponent = ({ route }: any) => {
    const { email, code } = route?.params || {};
    const { t } = useTranslation();

    const passwordConfirmRef = useRef<TextInput>(null);
    const newPasswordRef = useRef<TextInput>(null);

    const changePasswordSchema = yup.object().shape({
        oldPassword: yupValidate.password(),
        newPassword: yupValidate.password('oldPassword', false),
        confirmNewPassword: yupValidate.password('newPassword'),
    });
    const form = useForm({
        mode: 'all',
        resolver: yupResolver(changePasswordSchema),
    });
    const {
        handleSubmit,
        formState: { isValid },
    } = form;

    const confirm = async ({ password }: any) => {
        try {
            await resetPassword(email, password, code);
            navigate(AUTHENTICATE_ROUTE.LOGIN);
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
                    <FormProvider {...form}>
                        <StyledInputForm
                            name={'oldPassword'}
                            placeholder={t('authen.register.passwordPlaceholder')}
                            maxLength={32}
                            onSubmitEditing={() => newPasswordRef?.current?.focus()}
                        />
                        <StyledInputForm
                            name={'newPassword'}
                            ref={newPasswordRef}
                            placeholder={t('authen.register.passwordPlaceholder')}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            maxLength={32}
                            onSubmitEditing={() => passwordConfirmRef?.current?.focus()}
                        />
                        <StyledInputForm
                            name={'confirmNewPassword'}
                            ref={passwordConfirmRef}
                            placeholder={t('authen.register.passwordPlaceholder')}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            maxLength={32}
                            onSubmitEditing={handleSubmit(confirm)}
                        />
                    </FormProvider>
                    <StyledButton
                        title={'authen.register.confirm'}
                        onPress={handleSubmit(confirm)}
                        disabled={!isValid}
                        customStyle={[styles.buttonSave, !isValid && { backgroundColor: 'lightgray' }]}
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
        backgroundColor: Themes.COLORS.white,
        marginTop: 30,
    },
});

export default ChangePassword;
