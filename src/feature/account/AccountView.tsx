import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScaledSheet } from 'react-native-size-matters';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DEFAULT_FORM: any = {
    username: 'test',
    email: 'test@test.com',
    phone: '',
    password: '12345678',
    confirmPassword: '12345678',
};

const AccountView = () => {
    const schema = yup.object().shape({
        username: yupValidate.name(),
        email: yupValidate.email(),
        phone: yupValidate.phone(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password('password'),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(schema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        setValue,
        handleSubmit,
    } = form;

    const onSubmit = (formData: any) => {
        AlertMessage(JSON.stringify(formData), 'Form Data');
    };

    const onHandleReset = () => {
        const fieldsArr = ['username', 'email', 'phone', 'password', 'confirmPassword'];
        fieldsArr.forEach((fieldItem: any) => {
            setValue(fieldItem, DEFAULT_FORM[fieldItem]);
        });
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <FormProvider {...form}>
                <StyledInputForm name={'username'} label="Username" returnKeyType="next" />
                <StyledInputForm name={'email'} label="Email" />
                <StyledInputForm name={'phone'} label="Phone Number" />
                <StyledInputForm secureTextEntry={true} name={'password'} label="Password" />
                <StyledInputForm name={'confirmPassword'} label="Confirm Password" secureTextEntry={true} />
            </FormProvider>

            <StyledTouchable
                onPress={handleSubmit(onSubmit)}
                customStyle={[styles.button, !isValid && { backgroundColor: 'gray' }]}
                disabled={!isValid}
            >
                <StyledText i18nText={'Submit'} customStyle={styles.textButton} />
            </StyledTouchable>
            <StyledTouchable onPress={onHandleReset} customStyle={styles.button}>
                <StyledText i18nText={'Reset'} customStyle={styles.textButton} />
            </StyledTouchable>
        </KeyboardAwareScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
    },
    button: {
        width: '150@s',
        marginTop: 5,
        backgroundColor: Themes.COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
});

export default AccountView;
