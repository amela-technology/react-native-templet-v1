import React, { FunctionComponent, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import useLoading from 'components/base/modal/useLoading';
import { wait } from 'utilities/helper';
import StyledPicker from 'components/base/picker/StyledPicker';
import modal from 'components/base/modal/ModalManager';
import ModalContent from './components/ModalContent';

const dataPicker = [
    'label1',
    'label2',
    'label3',
    'label4',
    'label5',
    'label6',
    'label7',
    'label8',
    'label9',
    'label10',
];

const HomeScreen: FunctionComponent = () => {
    const navigation = useNavigation();
    const loading = useLoading();
    const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    const [currentValue, setCurrentValue] = useState(0);

    const fakeCallAPI = () => {
        loading.show();
        wait(2000).then(() => {
            loading.dismiss();
        });
    };

    const handleConfirm = (item: string) => {
        setValuePicker(item);
    };

    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Screen'} />
            <View style={styles.contScreen}>
                <StyledPicker
                    label="HEHEHE"
                    currentValue={valuePicker}
                    dataList={dataPicker}
                    onConfirm={handleConfirm}
                />
                <Button
                    title={'Modal'}
                    onPress={() => {
                        modal.show({
                            children: (
                                <ModalContent
                                    currentValue={currentValue}
                                    handleCallback={() => {
                                        alert('Test callback from inside modal');
                                    }}
                                    handleSetValue={setCurrentValue}
                                    closeModal={() => modal.dismiss()}
                                />
                            ),
                            isFromBottom: true,
                            onBackdropPress: () => {
                                modal.dismiss?.();
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
                <Button title={'Trigger Loading'} onPress={fakeCallAPI} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contScreen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 25,
    },
});

export default HomeScreen;
