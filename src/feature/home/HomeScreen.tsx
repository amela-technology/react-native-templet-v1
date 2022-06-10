import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { useNavigation } from '@react-navigation/native';
import { StyledButton } from 'components/base';
import ModalizeManager from 'components/base/modal/ModalizeManager';
import StyledPicker from 'components/base/picker/StyledPicker';
import StyledModalDropdown from 'components/base/StyledModalDropdown';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React, { FunctionComponent, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { wait } from 'utilities/helper';
import { dataDropdown, dataPicker } from 'utilities/staticData';
import ModalContent from './components/ModalContent';

const HomeScreen: FunctionComponent = () => {
    const navigation = useNavigation();
    const modalize = ModalizeManager();
    const [valuePicker, setValuePicker] = useState(dataPicker[0]);
    const [valueDropDown, setValueDropDown] = useState(dataDropdown[0]);
    const [currentValue, setCurrentValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const actionSheet = useRef<any>(null);

    const options = ['cancel', 'photo', 'camera'];

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
            <StyledHeader title={'Home Screen'} isBack={false} />
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
                <StyledButton title={'Action Sheet'} onPress={() => actionSheet?.current?.show()} />
                <ActionSheet
                    ref={actionSheet}
                    options={options}
                    cancelButtonIndex={0}
                    onPress={(index: any) => console.log(index)}
                    theme={'ios'}
                    userInterfaceStyle={'dark'}
                />
                <StyledModalDropdown
                    options={dataDropdown}
                    label={'test modal dropdown'}
                    setValueDropDown={setValueDropDown}
                />
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
