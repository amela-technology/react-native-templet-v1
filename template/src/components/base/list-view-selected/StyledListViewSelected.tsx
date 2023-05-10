import React, { useState, useEffect } from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemListViewSelected from './components/ItemListViewSelected';

interface ListViewProps {
    data: any;
    onPress?(item: any): void;
    customStyle?: StyleProp<ViewStyle>;
    arraySelected: any;
    isDisabled?: boolean;
    isMultiple: boolean;
    setArraySelected(arraySelected: any): void;
    customStyleItem?: StyleProp<TextStyle>;
    customStyleText?: StyleProp<TextStyle>;
}

const StyledListViewSelected = (props: ListViewProps) => {
    const [item, setItem] = useState<any>(null);
    const { arraySelected, setArraySelected, isMultiple } = props;
    useEffect(() => {
        if (item?.id) {
            if (arraySelected.includes(item?.id)) {
                const tempArray = arraySelected.filter((k: any) => k !== item?.id);
                setArraySelected([...tempArray]);
            } else if (isMultiple) {
                setArraySelected([...arraySelected, item?.id]);
            } else {
                setArraySelected([item?.id]);
            }
        }
    }, [item]);
    return (
        <View style={[styles.container, props.customStyle]}>
            {props.data.map((itemData: any) => (
                <ItemListViewSelected
                    name={itemData?.name}
                    isActive={arraySelected.includes(itemData?.id)}
                    key={`${itemData?.id}`}
                    onPressItem={() => setItem({ ...itemData })}
                    isDisabled={props?.isDisabled}
                    customStyleItem={props.customStyleItem}
                    customStyleText={props.customStyleText}
                />
            ))}
        </View>
    );
};

export default StyledListViewSelected;
const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
