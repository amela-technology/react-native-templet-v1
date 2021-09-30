import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { wait } from 'utilities/helper';
import StyledPicker from 'components/base/picker/StyledPicker';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import { dataPicker } from 'utilities/staticData';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { StyledButton } from 'components/base';
import ModalContent from './components/ModalContent';

const HomeScreen: FunctionComponent = () => {
    const navigation = useNavigation();
    const modalize = ModalizeManager();
    const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    const [currentValue, setCurrentValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fakeCallAPI = () => {
        setIsLoading(true);
        wait(2000).then(() => {
            setIsLoading(false);
        });
    };

    const handleConfirm = (item: string) => {
        setValuePicker(item);
    };

    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Screen'} />
            <StyledOverlayLoading visible={isLoading} />
            <View style={styles.contScreen}>
                <StyledPicker
                    label="Test Picker"
                    currentValue={valuePicker}
                    dataList={dataPicker}
                    onConfirm={handleConfirm}
                />
                <StyledButton
                    title="Open Modal 1"
                    onPress={() => {
                        modalize.show(
                            'modalTest',
                            <ModalContent
                                currentValue={currentValue}
                                handleSetValue={setCurrentValue}
                                handleIncreaseNumber={() => setCurrentValue(currentValue + 1)}
                                closeModal={() => modalize.dismiss('modalTest')}
                                handleCallback={() => alert('Test callback from modal')}
                            />,
                            {
                                isCenter: true,
                                adjustToContentHeight: true,
                                disableScrollIfPossible: false,
                            },
                        );
                    }}
                />
                <StyledButton
                    title={'Detail Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL)}
                />
                <StyledButton
                    title={'Data Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA)}
                />
                <StyledButton
                    title={'User List Screen'}
                    onPress={() => navigation.navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST)}
                />
                <StyledButton title={'Trigger Loading'} onPress={fakeCallAPI} />
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
    contModalContent: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
