import { StyledListViewSelected } from 'components/base';
import * as React from 'react';
import { View } from 'react-native';

const data = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
];
const NotificationScreen: React.FunctionComponent = () => {
    const [arraySelected, setArraySelected] = React.useState<any>([]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
export default NotificationScreen;
