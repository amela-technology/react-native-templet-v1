import Images from 'assets/images';
import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledText } from '.';

interface Props {
    options: any;
    customStyle?: StyleProp<ViewStyle>;
    errorMessage?: string;
    setValueDropDown?: any;
    label?: string;
    disabled?: boolean;
    multipleSelect?: boolean;
    scrollEnabled?: boolean;
    saveScrollPosition?: boolean;
    defaultIndex?: Number;
    defaultValue?: string;
    accessible?: boolean;
    animated?: boolean;
    isFullWidth?: boolean;
    showsVerticalScrollIndicator?: boolean;
    keyboardShouldPersistTaps?: string;
    showSearch?: boolean;
    keySearchObject?: string;
    renderSearch?: any;
    searchInputStyle?: any;
    searchPlaceholder?: string;
    style?: any;
    textStyle?: any;
    defaultTextStyle?: any;
    dropdownStyle?: any;
    dropdownTextStyle?: any;
    dropdownTextHighlightStyle?: any;
    dropdownListProps?: any;
    dropdownTextProps?: any;
    adjustFrame?: any;
    renderRowComponent?: any;
    renderRowProps?: any;
    renderSeparator?: any;
    renderButtonText?: any;
    renderRowText?: any;
    renderButtonComponent?: any;
    renderRightComponent?: any;
    renderButtonProps?: any;
    onDropdownWillShow?: any;
    onDropdownWillHide?: any;
    numberOfLines?: Number;
}

const StyledModalDropdown = (props: Props) => {
    const {
        customStyle,
        label,
        defaultIndex = 0,
        defaultValue = 'choose',
        animated = true,
        textStyle = styles.title,
        dropdownStyle = styles.dropdownStyle,
        setValueDropDown,
        ...otherProps
    } = props;
    const renderRow = (item: string, index: number, isSelected: boolean) => (
        <View
            style={[
                styles.rowStyle,
                {
                    backgroundColor: isSelected ? Themes.COLORS.grey : Themes.COLORS.white,
                },
            ]}>
            <StyledIcon source={Images.photo.defaultImage} size={30} customStyle={styles.optionImage} />
            <StyledText originValue={item || ''} customStyle={{ flexShrink: 1 }} />
        </View>
    );
    return (
        <View style={styles.customContainerStyle}>
            {label && <StyledText originValue={label} customStyle={styles.label}></StyledText>}
            <View style={[styles.container, customStyle]}>
                <ModalDropdown
                    defaultIndex={defaultIndex}
                    defaultValue={defaultValue}
                    animated={animated}
                    textStyle={styles.title}
                    dropdownStyle={dropdownStyle}
                    renderRow={(item: any, index: number, isSelected: boolean) => renderRow(item, index, isSelected)}
                    onSelect={(index: boolean, item: string) => setValueDropDown?.(item)}
                    {...otherProps}
                />
            </View>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        width: '200@s',
        paddingVertical: '10@vs',
        borderWidth: 1,
        borderRadius: 10,
    },
    optionImage: {
        marginRight: '10@s',
        borderRadius: 25,
    },
    title: {
        fontSize: '16@ms0.3',
        fontWeight: 'bold',
        color: Themes.COLORS.textPrimary,
        marginHorizontal: '10@s',
    },
    label: {
        marginBottom: '10@vs',
    },
    rowStyle: {
        paddingVertical: '10@vs',
        flexDirection: 'row',
        paddingHorizontal: '10@s',
        alignItems: 'center',
        width: '200@s',
    },
    dropdownStyle: {
        marginTop: '12@vs',
    },
    customContainerStyle: {
        marginVertical: '10@vs',
    },
});
export default memo(StyledModalDropdown);
