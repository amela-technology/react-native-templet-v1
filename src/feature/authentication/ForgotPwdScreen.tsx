import React, { useState } from 'react';
import Images from 'assets/images';
import { View, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { StyledButton, StyledImage, StyledInput } from 'components/base';
import { Themes } from 'assets/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigate } from 'navigation/NavigationService';
import { useTranslation } from 'react-i18next';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { forgotPassword } from 'api/modules/api-app/authenticate';
import { validateEmail } from 'utilities/validate';
import AlertMessage from 'components/base/AlertMessage';

const SendEmailScreen: React.FunctionComponent = ({ route }: any) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const confirm = async () => {
        try {
            console.log('validateEmail', validateEmail(email));
            if (!validateEmail(email)) {
                return;
            }
            await forgotPassword(email);
            navigate(AUTHENTICATE_ROUTE.SENDOTP, { email });
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
                        value={email}
                        onChangeText={setEmail}
                        placeholder={t('register.emailPlaceholder')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={confirm}
                    />
                    <StyledButton
                        title={'sendEmail.sendButtonTitle'}
                        onPress={confirm}
                        customStyle={styles.buttonSave}
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
