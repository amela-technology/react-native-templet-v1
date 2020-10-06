import * as React from 'react';
import { View, Button } from 'react-native';
import StyledText from 'components/base/StyledText';
import { useNavigation } from '@react-navigation/native';
import useModal from 'components/base/modal/useModal';
import Images from 'assets/images';
import StyledModalPicker from 'components/base/picker/StyledModalPicker';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';

const dataPicker = [
    { name: 'label1', id: 1 },
    { name: 'label2', id: 2 },
    { name: 'label3', id: 3 },
    { name: 'label4', id: 4 },
    { name: 'label5', id: 5 },
    { name: 'label6', id: 6 },
    { name: 'label7', id: 7 },
    { name: 'label8', id: 8 },
    { name: 'label9', id: 9 },
    { name: 'label10', id: 10 },
    { name: 'label11', id: 11 },
    { name: 'label12', id: 12 },
    { name: 'label13', id: 13 },
    { name: 'label14', id: 14 },
    { name: 'label15', id: 15 },
    { name: 'label16', id: 16 },
    { name: 'label17', id: 17 },
];

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();
    const modal = useModal();
    const [valuePicker, setValuePicker] = React.useState(1);
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Screen'} />
            <View style={{ flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 25 }}>
                <StyledModalPicker
                    title={'picker title'}
                    value={valuePicker}
                    icon={Images.icons.selected}
                    customStyle={{ marginVertical: 10, width: '100%' }}
                    data={dataPicker}
                    onChangeValue={(name: string, id: number) => {
                        setValuePicker(id);
                    }}
                />
                <Button
                    title={'Modal'}
                    onPress={() => {
                        modal.show({
                            children: (
                                <View
                                    style={{
                                        height: 100,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <StyledText originValue={'Hello'} />
                                    <Button title={'hide'} onPress={() => modal.dismiss()} />
                                </View>
                            ),
                            onBackdropPress: () => {
                                modal.dismiss();
                            },
                        });
                    }}
                />
                <Button
                    title={'Detail Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL)}
                />
                <Button
                    title={'Data Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA)}
                />
                <Button
                    title={'User List Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST)}
                />
            </View>
        </View>
    );
};
export default HomeScreen;
