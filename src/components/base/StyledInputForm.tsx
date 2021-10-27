/* eslint-disable no-unused-expressions */
import React, { forwardRef } from 'react';
import { Controller, ControllerRenderProps, RegisterOptions, useFormContext, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { logger } from 'utilities/logger';
import StyledInput, { StyledInputProps } from './StyledInput';

interface FormInputProps extends StyledInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
    form?: UseFormReturn;
}

const StyledInputForm = forwardRef((props: FormInputProps, ref: any) => {
    const { t } = useTranslation();
    const { name, rules, defaultValue = '', onChangeText, form, ...inputProps } = props;
    const formContext = useFormContext();

    if (!(formContext || form)) {
        logger(t('error.inputComponent'), true, '');
        return <StyledInput errorMessage={'error.inputComponent'} editable={false} />;
    }

    const {
        control,
        formState: { errors },
    } = formContext || form;
    const errorMessage = errors?.[name]?.message || '';

    const onChangeInput = (text: string, onChangeControl: any) => {
        onChangeText ? onChangeText(text) : onChangeControl(text);
    };

    const renderBaseInput = ({ field: { onChange, value } }: { field: ControllerRenderProps }) => {
        return (
            <StyledInput
                ref={ref}
                value={value}
                onChangeText={(text: string) => onChangeInput(text, onChange)}
                errorMessage={errorMessage}
                {...inputProps}
            />
        );
    };

    return (
        <Controller
            control={control}
            name={name as any}
            defaultValue={defaultValue}
            rules={rules}
            render={renderBaseInput}
        />
    );
});

export default StyledInputForm;
