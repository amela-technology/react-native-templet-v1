import { StyledListViewSelected } from 'components/base';
import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const data = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
];
const NotificationScreen: FunctionComponent = () => {
    const [arraySelected, setArraySelected] = useState<any>([]);
    return (
        <View style={styles.container}>
            <StyledListViewSelected
                customStyle={{}}
                data={data}
                arraySelected={arraySelected}
                isMultiple={true}
                setArraySelected={(array: any) => setArraySelected(array)}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default NotificationScreen;
