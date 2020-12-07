import React, { useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { StyledText, StyledButton, StyledImage, StyledInput } from 'components/base';
import { Themes } from 'assets/themes';
import Images from 'assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigate } from 'navigation/NavigationService';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { useTranslation } from 'react-i18next';
import { resetPassword } from 'api/modules/api-app/authenticate';
import AlertMessage from 'components/base/AlertMessage';
import { validatePassword } from 'utilities/validate';

const ChangePassword: React.FunctionComponent = ({ route }: any) => {
    const passwordRef = useRef<any>(null);
    const passworComfirmdRef = useRef<any>(null);
    const { t } = useTranslation();
    const [aaa, bbb] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const { email, code } = route?.params;
    const confirm = async () => {
        try {
            if (newPass !== confirmNewPass) {
                AlertMessage(t('validateMessage.passwordNotMatch'));
                return;
            }
            if (!validatePassword(newPass)) {
                AlertMessage(t('validateMessage.validatePassword'));
                return;
            }
            await resetPassword(email, newPass, code);
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
                    enableAutomaticScroll={Platform.OS === 'ios'}
                    showsVerticalScrollIndicator={false}
                >
                    <StyledInput
                        value={aaa}
                        onChangeText={bbb}
                        placeholder={t('registerAccount.passwordPlaceholder')}
                        maxLength={32}
                    />
                    <StyledInput
                        value={newPass}
                        onChangeText={setNewPass}
                        placeholder={t('registerAccount.passwordPlaceholder')}
                        ref={passwordRef}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        maxLength={32}
                        onSubmitEditing={() => passworComfirmdRef.current.focus()}
                    />
                    <StyledInput
                        value={confirmNewPass}
                        onChangeText={setConfirmNewPass}
                        placeholder={t('registerAccount.passwordPlaceholder')}
                        secureTextEntry={true}
                        returnKeyType={'next'}
                        maxLength={32}
                        onSubmitEditing={confirm}
                    />
                    <StyledButton title={'register.confirm'} onPress={confirm} customStyle={styles.buttonSave} />
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
        paddingVertical: 15,
        backgroundColor: Themes.COLORS.black,
        marginTop: 30,
        paddingHorizontal: 40,
    },
});
export default ChangePassword;
