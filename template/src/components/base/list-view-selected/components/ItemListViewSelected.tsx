import { Themes } from 'assets/themes';
import React, { memo } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemListProps {
    name: string;
    isActive?: boolean;
    onPressItem?(item: any): void;
    isDisabled?: boolean;
    customStyleItem?: StyleProp<TextStyle>;
    customStyleText?: StyleProp<TextStyle>;
}
const ItemListViewSelected = (propsItem: ItemListProps) => {
    return (
        <TouchableOpacity
            onPress={propsItem.onPressItem}
            activeOpacity={propsItem?.isDisabled ? 1 : 0.6}
            style={[
                styles.btn,
                propsItem.customStyleItem,
                {
                    backgroundColor: propsItem.isActive ? Themes.COLORS.secondary : Themes.COLORS.white,
                    borderColor: propsItem.isActive ? Themes.COLORS.secondary : Themes.COLORS.black,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    propsItem.customStyleText,
                    { color: propsItem.isActive ? Themes.COLORS.white : Themes.COLORS.black },
                ]}
            >
                {propsItem.name}
            </Text>
        </TouchableOpacity>
    );
};
const styles = ScaledSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    btn: {
        height: '30@vs',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: '20@s',
        marginRight: '8@s',
        borderColor: Themes.COLORS.black,
        borderWidth: 0.3,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        lineHeight: 20,
        color: Themes.COLORS.black,
    },
});
export default memo(ItemListViewSelected, (prev, next) => {
    return prev.isActive === next.isActive;
});
