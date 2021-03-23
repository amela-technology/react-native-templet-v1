import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { requireField } from 'utilities/format';
import { regexPhone } from 'utilities/validate';
import * as yup from 'yup';

const DEFAULT_FORM = {
    username: 'test',
    email: 'test@test.com',
    phone: '',
    password: '12345678',
    confirmPassword: '12345678',
};

const AccountView = () => {
    const schema = yup.object().shape({
        username: yup.string().required(() => requireField('Username')),
        email: yup.string().email('validateMessage.emailInvalid'),
        phone: yup.string().matches(regexPhone, {
            message: 'validateMessage.phoneInvalid',
            excludeEmptyString: true, // skip empty string on validate
        }),
        password: yup.string().required(() => requireField('Password')),
        confirmPassword: yup
            .string()
            .required(() => requireField('Confirm Password'))
            .oneOf([yup.ref('password'), null], 'validateMessage.notMatchPassword'),
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
        reset,
        handleSubmit,
    } = form;
    const onSubmit = (formData: any) => {
        AlertMessage(JSON.stringify(formData), 'Form Data');
    };
    const onChangeUsername = (text: string) => {
        form.setValue('username', text.length === 12 ? 'Custom onChangeText' : text, {
            shouldValidate: true, // validate when set value
        });
    };

    return (
        <View style={styles.container}>
            <FormProvider {...form}>
                <StyledInputForm
                    name={'username'}
                    label="Username"
                    returnKeyType="next"
                    onChangeText={onChangeUsername}
                />
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
            <StyledTouchable onPress={() => reset()} customStyle={styles.button}>
                <StyledText i18nText={'Reset'} customStyle={styles.textButton} />
            </StyledTouchable>
        </View>
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
