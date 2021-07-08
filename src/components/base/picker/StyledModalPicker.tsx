/* eslint-disable no-shadow */
import React, { useRef } from 'react';
import { Dimensions, StyleProp, View, ViewStyle, TouchableOpacity, Keyboard, ImageSourcePropType } from 'react-native';
import StyledText from 'components/base/StyledText';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledIcon, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import Images from 'assets/images';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';

const { height } = Dimensions.get('window');

interface PickerData {
    id: string | number;
    value: string | number;
    name?: string;
}
interface StyledModalPickerProps {
    title: string;
    onChangeValue(label: string | number, value?: string | number): void;
    value: number | string;
    data: any;
    customStyle?: StyleProp<ViewStyle>;
    icon?: ImageSourcePropType;
}
const StyledModalPicker = (props: StyledModalPickerProps) => {
    const { onChangeValue, data, customStyle } = props;
    const modalize = useRef<Modalize>(null);
    const contentRef = useRef<any>(null);
    let exitsValue: string | number;
    const exits: PickerData | undefined = props?.data?.find((k: PickerData) => k?.id === props?.value);

    let exitsLabel: any;
    if (exits) {
        exitsLabel = exits.value || exits.name;
        exitsValue = exits.id;
    } else if (data.length > 0) {
        exitsLabel = data?.[0]?.value || data?.[0]?.name;
        exitsValue = data?.[0]?.id;
    } else {
        exitsLabel = '';
        exitsValue = '';
    }
    const renderPicker = () => {
        Keyboard.dismiss();
        modalize.current?.open();
    };

    const PickerItem = ({ check, onChange, label }: { check: boolean; onChange?(): void; label?: string }) => {
        return (
            <View style={styles.pickerItemContainer}>
                <TouchableOpacity style={styles.pickerItemBtn} onPress={onChange} activeOpacity={0.6}>
                    <StyledIcon
                        source={check ? Images.icons.radio.check : Images.icons.radio.uncheck}
                        size={20}
                        customStyle={{
                            tintColor: check ? Themes.COLORS.primary : 'gray',
                            marginRight: 15,
                        }}
                    />
                    <StyledText
                        numberOfLines={1}
                        customStyle={{
                            fontSize: 16,
                            color: check ? Themes.COLORS.black : 'gray',
                        }}
                        originValue={label || ''}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const MemoPickerItem = React.memo(PickerItem);
    const renderItem = ({ item }: { item: PickerData }) => {
        return (
            <MemoPickerItem
                check={exitsValue === item.id}
                onChange={() => {
                    onChangeValue(item?.value, item?.id);
                    modalize.current?.close();
                }}
                label={item?.value?.toString() || item?.name?.toString()}
            />
        );
    };

    const initScrollIndex = props.data.findIndex((k: PickerData) => k?.id === exitsValue);

    return (
        <StyledTouchable customStyle={[styles.wrapperAll, customStyle]} onPress={renderPicker}>
            <View style={styles.content}>
                <StyledText customStyle={styles.value} originValue={`${exitsLabel}` || ''} />
                <StyledIcon source={props.icon ? props.icon : Images.icons.selected} size={13} />
            </View>
            <Portal>
                <Modalize
                    ref={modalize}
                    contentRef={contentRef}
                    HeaderComponent={() => {
                        return (
                            <View style={styles.headerContainer}>
                                <StyledText customStyle={styles.headerTitle} i18nText={props?.title || ''} />
                            </View>
                        );
                    }}
                    FooterComponent={() => {
                        return <View style={{ height: 50 }} />;
                    }}
                    adjustToContentHeight={props.data.length < 9}
                    withHandle={false}
                    modalHeight={props.data.length > 9 ? height * 0.6 : undefined}
                    flatListProps={{
                        data: props.data,
                        keyExtractor: (item: PickerData) => `${item?.id}`,
                        renderItem,
                        contentContainerStyle: { paddingHorizontal: 15 },
                        initialScrollIndex: initScrollIndex > 7 ? initScrollIndex - 3 : undefined,
                        initialNumToRender: 15,
                        getItemLayout: (data: any, index: number) => ({ length: 55, offset: 55 * index, index }),
                    }}
                />
            </Portal>
        </StyledTouchable>
    );
};
const styles = ScaledSheet.create({
    wrapperAll: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: '7@vs',
        paddingHorizontal: '5@s',
        paddingBottom: '7@vs',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '15@s',
        width: '100%',
        borderRadius: '36@vs',
        paddingLeft: '15@s',
        paddingVertical: '12@vs',
        marginTop: '5@vs',
        color: Themes.COLORS.black,
        borderColor: 'gray',
        borderWidth: 1,
    },
    title: {
        fontSize: '13@ms0.3',
        lineHeight: 18,
    },
    value: {
        fontSize: '15@ms0.3',
        lineHeight: 23,
    },
    wrapperText: {},
    iconToggle: {},
    headerContainer: {
        paddingVertical: '15@vs',
        marginHorizontal: '15@s',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    titleModal: {
        color: Themes.COLORS.black,
        marginLeft: '20@s',
    },
    pickerItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: '15@vs',
        height: 55,
    },
    pickerItemBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
        paddingRight: '40@s',
    },
});
export default StyledModalPicker;
