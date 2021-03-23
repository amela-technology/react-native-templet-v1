/* eslint-disable no-unused-expressions */
import React, { forwardRef } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { StyleProp, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText } from '.';
import StyledInput, { StyledInputProps } from './StyledInput';

interface FormInputProps extends StyledInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
}

const StyledInputForm = forwardRef((props: FormInputProps, ref: any) => {
    const { name, rules, defaultValue = '', onChangeText, ...inputProps } = props;
    const formContext = useFormContext();
    const { control, errors } = formContext;
    const errorMessage = errors[name]?.message || '';
    const onChangeInput = (text: string, onChangeControl: any) => {
        onChangeText ? onChangeText(text) : onChangeControl(text);
    };
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
            render={({ onChange, value }) => {
                return (
                    <StyledInput
                        ref={ref}
                        value={value}
                        onChangeText={(text: string) => onChangeInput(text, onChange)}
                        errorMessage={errorMessage}
                        {...inputProps}
                    />
                );
            }}
        />
    );
});

const styles = ScaledSheet.create({
    textInput: {
        width: '300@s',
        padding: 2,
        borderWidth: 0.5,
        paddingHorizontal: '10@s',
        paddingVertical: '10@vs',
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: '5@vs',
    },
});

export default StyledInputForm;
