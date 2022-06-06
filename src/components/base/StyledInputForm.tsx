/* eslint-disable no-unused-expressions */
import React, { forwardRef } from 'react';
import { Controller, RegisterOptions, useFormContext, UseFormMethods } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { logger } from 'utilities/logger';
import StyledInput, { StyledInputProps } from './StyledInput';

interface Props extends StyledInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
    form?: UseFormMethods;
}

const StyledInputForm = forwardRef((props: Props, ref: any) => {
    const { t } = useTranslation();
    const { name, rules, defaultValue = '', onChangeText, onBlur, form, ...inputProps } = props;
    const formContext = useFormContext();

    if (!(formContext || form)) {
        logger(t('error.inputComponent'), true, '');
        return <StyledInput errorMessage={'error.inputComponent'} editable={false} />;
    }

    const { control, errors } = formContext || form;
    const errorMessage = errors?.[name]?.message || '';

    const onChangeInput = (text: string, onChangeControl: any) => {
        onChangeText ? onChangeText(text) : onChangeControl(text);
    };
    const onBlurInput = (data: any, onBlurControl: any) => {
        onBlur ? onBlur(data) : onBlurControl();
    };

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
            render={({ onChange, value, onBlur: onBlurControl }) => {
                return (
                    <StyledInput
                        ref={ref}
                        value={value}
                        onChangeText={(text: string) => onChangeInput(text, onChange)}
                        onBlur={(data: any) => onBlurInput(data, onBlurControl)}
                        errorMessage={errorMessage}
                        {...inputProps}
                    />
                );
            }}
        />
    );
});

export default StyledInputForm;
