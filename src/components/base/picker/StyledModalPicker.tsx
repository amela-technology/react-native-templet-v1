import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText, StyledIcon, StyledTouchable } from 'components/base';
import { View, ImageSourcePropType, StyleProp, ViewStyle, TouchableOpacity, Dimensions, TextStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Images from 'assets/images';

const { height } = Dimensions.get('window');

interface PickerData {
    id: string | number;
    name: string | number;
}

interface StyledImageProps {
    title?: string;
    value: string | number;
    customStyle?: StyleProp<ViewStyle>;
    customTitleStyle?: StyleProp<TextStyle>;
    icon?: ImageSourcePropType;
    data: Array<PickerData>;
    onChangeValue(label: string | number, value?: string | number): void;
}

const PickerItem = ({ check, onChange, label }: { check: boolean; onChange?(): void; label: string }) => {
    return (
        <View style={styles.pickerItemContainer}>
            <TouchableOpacity style={styles.pickerItemBtn} onPress={onChange} activeOpacity={0.6}>
                <StyledIcon
                    source={check ? Images.icons.radio.check : Images.icons.radio.uncheck}
                    size={20}
                    customStyle={{
                        tintColor: check ? Themes.COLORS.black : 'gray',
                        marginRight: 15,
                    }}
                />
                <StyledText
                    numberOfLines={1}
                    customStyle={{
                        fontSize: 16,
                        color: check ? Themes.COLORS.black : 'gray',
                    }}
                >
                    {label}
                </StyledText>
            </TouchableOpacity>
        </View>
    );
};

const MemoPickerItem = React.memo(PickerItem);

const StyledModalPicker = (props: StyledImageProps) => {
    const exits: PickerData | undefined = props.data.find((k: PickerData) => k?.id === props?.value);

    let exitsLabel: string | number;
    let exitsValue: string | number;
    if (exits) {
        exitsLabel = exits.name;
        exitsValue = exits.id;
    } else if (props.data.length > 0) {
        exitsLabel = props.data[0].name;
        exitsValue = props.data[0].id;
    } else {
        exitsLabel = '';
        exitsValue = '';
    }

    const modalize = React.useRef<Modalize>(null);
    const contentRef = React.useRef<any>(null);

    const renderPicker = () => {
        modalize.current?.open();
    };

    const renderItem = ({ item }: { item: PickerData }) => {
        return (
            <MemoPickerItem
                check={exitsValue === item.id}
                onChange={() => {
                    props.onChangeValue(item?.name, item?.id);
                    modalize.current?.close();
                }}
                label={item.name.toString()}
            />
        );
    };

    const initScrollIndex = props.data.findIndex((k: PickerData) => k?.id === exitsValue);

    return (
        <View style={props.customStyle}>
            {props.title ? (
                <StyledText customStyle={[styles.title, props.customTitleStyle]}>{props.title}</StyledText>
            ) : null}
            <StyledTouchable customStyle={styles.content} onPress={renderPicker}>
                <StyledText>{exitsLabel?.toString() || ''}</StyledText>
                <StyledIcon source={props.icon ? props.icon : Images.icons.selected} size={13} />
            </StyledTouchable>
            <Portal>
                <Modalize
                    ref={modalize}
                    contentRef={contentRef}
                    HeaderComponent={() => {
                        return (
                            <View style={styles.headerContainer}>
                                <StyledText style={styles.headerTitle}>{props?.title || ''}</StyledText>
                            </View>
                        );
                    }}
                    FooterComponent={() => {
                        return <View style={{ height: 50 }} />;
                    }}
                    adjustToContentHeight={props.data.length < 12}
                    withHandle={false}
                    modalHeight={props.data.length > 12 ? height * 0.6 : undefined}
                    flatListProps={{
                        data: props.data,
                        keyExtractor: (item: PickerData) => item?.id.toString(),
                        renderItem,
                        contentContainerStyle: { paddingHorizontal: 15 },
                        initialScrollIndex: initScrollIndex > 7 ? initScrollIndex - 3 : undefined,
                        initialNumToRender: 15,
                        getItemLayout: (data: any, index: number) => ({ length: 55, offset: 55 * index, index }),
                    }}
                />
            </Portal>
        </View>
    );
};

const styles = ScaledSheet.create({
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
    title: {
        color: Themes.COLORS.black,
        marginLeft: '20@s',
    },
});

export default React.memo(StyledModalPicker);
