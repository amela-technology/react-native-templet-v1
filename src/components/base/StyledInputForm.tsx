/* eslint-disable no-unused-expressions */
import React, { forwardRef, FunctionComponent } from 'react';
import {
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
    RegisterOptions,
    useFormContext,
    UseFormReturn,
    UseFormStateReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import { logger } from 'utilities/logger';
import { ICheckBox } from './CheckBox';
import { PickerProps } from './picker/StyledPicker';
import StyledInput, { StyledInputProps } from './StyledInput';

type TName = FieldPath<FieldValues>;

export interface IParamsRender {
    field: ControllerRenderProps<FieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
}
interface FormInputProps extends StyledInputProps {
    name: string;
    rules?: RegisterOptions;
    defaultValue?: string;
    form?: UseFormReturn;
    InputComponent?: FunctionComponent<any>;
    renderBaseInput?: ({ field, fieldState, formState }: IParamsRender) => React.ReactElement;
    dynamicOnChangeName?: string;
    dateTimeProps?: ReactNativeModalDateTimePickerProps;
    pickerProps?: PickerProps;
    checkBoxProps?: ICheckBox;
}

const StyledInputForm = forwardRef((props: FormInputProps, ref: any) => {
    const { t } = useTranslation();
    const {
        name,
        rules,
        defaultValue = '',
        onChangeText,
        InputComponent = StyledInput,
        form,
        dynamicOnChangeName = 'onChangeText',
        pickerProps,
        checkBoxProps,
        ...inputProps
    } = props;
    const formContext = useFormContext();

    if (!(formContext || form)) {
        logger(t('error.inputComponent'), true, '');
        return <InputComponent errorMessage={'error.inputComponent'} {...inputProps} editable={false} />;
    }

    const { control } = formContext || form;
    const customInputProps = checkBoxProps || pickerProps || inputProps;

    const onChangeInput = (text: string, onChangeControl: any) => {
        onChangeText ? onChangeText(text) : onChangeControl(text);
    };

    const renderBaseInput = ({ field: { onChange, value }, fieldState: { error } }: IParamsRender) => {
        return (
            <InputComponent
                ref={ref}
                value={value}
                errorMessage={error?.message}
                {...{ [dynamicOnChangeName]: (text: string) => onChangeInput(text, onChange) }}
                {...customInputProps}
            />
        );
    };

    return (
        <Controller
            control={control}
            name={name as any}
            defaultValue={defaultValue}
            rules={rules}
            render={props?.renderBaseInput || renderBaseInput}
        />
    );
});

export default StyledInputForm;
