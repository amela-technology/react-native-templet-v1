import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ITEM_WIDTH, ITEM_HEIGHT } from 'utilities/staticData';

interface IItem {
    name?: string;
}

const Item = (props: IItem) => {
    const { name = 'Default' } = props;
    return (
        <View
            style={{
                width: ITEM_WIDTH,
                flexDirection: 'row',
                borderRadius: ITEM_HEIGHT,
                borderWidth: 1,
                alignItems: 'center',
                height: ITEM_HEIGHT,
            }}
        >
            <View style={{ width: ITEM_HEIGHT, height: ITEM_HEIGHT, borderRadius: ITEM_HEIGHT, borderWidth: 1 }} />
            <View style={{ width: ITEM_WIDTH - ITEM_HEIGHT * 2, alignItems: 'center' }}>
                <Text>{name}</Text>
            </View>
        </View>
    );
};

export default Item;

const styles = StyleSheet.create({});
