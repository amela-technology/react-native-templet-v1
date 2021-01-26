import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import StyledText from 'components/base/StyledText';
import { useNavigation } from '@react-navigation/native';
import useModal from 'components/base/modal/useModal';
import StyledHeader from 'components/common/StyledHeader';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import useLoading from 'components/base/modal/useLoading';
import { wait } from 'utilities/helper';
import StyledPicker from 'components/base/picker/StyledPicker';

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

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();
    const modal = useModal();
    const loading = useLoading();
    const [valuePicker, setValuePicker] = React.useState(dataPicker[0]);

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
                <StyledPicker currentValue={valuePicker} dataList={dataPicker} onConfirm={handleConfirm} />
                <Button
                    title={'Modal'}
                    onPress={() => {
                        modal.show?.({
                            children: (
                                <View style={styles.contModalContent}>
                                    <StyledText originValue={'Hello'} />
                                    <StyledPicker
                                        currentValue={valuePicker}
                                        dataList={dataPicker}
                                        onConfirm={handleConfirm}
                                    />
                                    <Button title={'hide'} onPress={() => modal.dismiss?.()} />
                                </View>
                            ),
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
    contModalContent: {
        width: '50%', // Define width and height of modal here
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
