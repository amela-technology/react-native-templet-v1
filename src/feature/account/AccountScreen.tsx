/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { CheckBox, StyledButton } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledDateTimePicker from 'components/base/picker/StyledDateTimePicker';
import StyledPicker from 'components/base/picker/StyledPicker';
import StyledInputForm, { IParamsRender } from 'components/base/StyledInputForm';
import StyledHeader from 'components/common/StyledHeader';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { dataPicker } from 'utilities/staticData';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';

const DEFAULT_FORM = {
    username: 'test001',
    email: 'test@test.com',
    phone: '0123456789',
    password: '12345678',
    confirmPassword: '12345678',
    birthday: '1997/11/16',
    labelPicker: dataPicker[4],
    policy1: '1',
    policy2: '',
};

const AccountScreen = () => {
    const schema = yup.object().shape({
        username: yupValidate.name(),
        email: yupValidate.email(),
        phone: yupValidate.phone(),
        password: yupValidate.password(),
        confirmPassword: yupValidate.password('password'),
        birthday: yupValidate.birthday(),
        labelPicker: yupValidate.labelPicker().test('CheckManualLabel', 'labelPicker cannot equal label1', value => {
            return value !== 'label1';
        }),
        policy1: yupValidate.policy(),
        policy2: yupValidate.policy(),
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
        handleSubmit,
        reset,
        setValue,
        watch,
    } = form;

    const onSubmit = (formData: any) => {
        console.log(formData);
        AlertMessage(JSON.stringify(formData), 'Form Data');
    };

    const setValueForm = (name: any, value: string) => {
        setValue(name, value, { shouldValidate: true });
    };

    const renderCheckBoxPolicyForm = ({ field, fieldState, formState }: IParamsRender) => {
        const { value, onChange } = field;
        const { error } = fieldState;
        return (
            <CheckBox
                value={value}
                onConfirm={onChange}
                content={'account.policy'}
                customStyle={styles.checkBoxContainer}
            />
        );
    };

    return (
        <>
            <StyledHeader title={'Form Example'} isBack={false} />
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                enableResetScrollToCoords={false}>
                <FormProvider {...form}>
                    <StyledInputForm name={'username'} label="Username" returnKeyType="next" />
                    <StyledInputForm name={'email'} label="Email" />
                    <StyledInputForm name={'phone'} label="Phone Number" />
                    <StyledInputForm secureTextEntry={true} name={'password'} label="Password" />
                    <StyledInputForm name={'confirmPassword'} label="Confirm Password" secureTextEntry={true} />
                    <StyledInputForm name={'birthday'} label="Date Of Birth" InputComponent={StyledDateTimePicker} />
                    <StyledInputForm
                        name={'labelPicker'}
                        label="StyledPicker"
                        InputComponent={StyledPicker}
                        dynamicOnChangeName={'onConfirm'}
                        pickerProps={{
                            label: 'Label Picker',
                            labelInput: 'Label Picker', // label UI same StyledInput
                            dataList: dataPicker,
                            customStyle: styles.pickerContainer,
                        }}
                    />
                    <StyledInputForm
                        name={'policy1'}
                        InputComponent={CheckBox}
                        dynamicOnChangeName={'onConfirm'}
                        checkBoxProps={{ content: 'account.policy', customStyle: styles.checkBoxContainer }}
                    />
                    <StyledInputForm name={'policy2'} renderBaseInput={renderCheckBoxPolicyForm} />
                </FormProvider>
                <View style={styles.wrapButton}>
                    <StyledButton onPress={reset} title={'Reset Form'} />
                    <StyledButton
                        onPress={handleSubmit(onSubmit)}
                        title={'Submit'}
                        disabled={!isValid}
                        customStyle={[styles.button, !isValid && { backgroundColor: Themes.COLORS.grey }]}
                        customStyleText={{ color: Themes.COLORS.white }}
                    />
                    <StyledButton
                        onPress={() => setValueForm('labelPicker', dataPicker[0])}
                        title={'Set Label Picker'}
                    />
                    <StyledButton onPress={() => setValueForm('labelPicker', '')} title={'Clear Label Picker'} />
                    <StyledButton onPress={() => setValueForm('policy1', '')} title={'Uncheck Policy1'} />
                    <StyledButton
                        onPress={() => setValueForm('policy2', watch('policy2') ? '' : '1')}
                        title={'Switch Policy2'}
                    />
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: '20@vs',
        paddingTop: '20@vs',
    },
    textButton: {
        color: 'white',
    },
    button: {
        backgroundColor: Themes.COLORS.primary,
    },
    pickerContainer: {
        marginTop: '10@vs',
        marginHorizontal: '20@s',
        width: '80%',
        marginBottom: '10@vs',
    },
    checkBoxContainer: {
        marginVertical: '10@vs',
        width: '80%',
    },
    wrapButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: '20@s',
    },
});

export default AccountScreen;
