import * as React from 'react';
import { View, Button } from 'react-native';
import StyledText from 'components/base/StyledText';
import { useNavigation } from '@react-navigation/native';
import DialogManager from 'components/base/modal';
import Images from 'assets/images';
import StyledModalPicker from 'components/base/picker/StyledModalPicker';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();
    const [valuePicker, setValuePicker] = React.useState(1);
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 25 }}>
            <StyledModalPicker
                title={'picker title'}
                value={valuePicker}
                icon={Images.icons.selected}
                customStyle={{ marginVertical: 10, width: '100%' }}
                data={[
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
                ]}
                onChangeValue={(name: string, id: number) => {
                    setValuePicker(id);
                }}
            />
            <Button
                title={'Modal'}
                onPress={() =>
                    DialogManager.show({
                        children: (
                            <View
                                style={{
                                    height: 100,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <StyledText>Hello</StyledText>
                                <Button title={'hide'} onPress={() => DialogManager.dismiss()} />
                            </View>
                        ),
                        width: 0.9,
                        onTouchOutside: () => {
                            DialogManager.dismiss();
                        },
                    })
                }
            />
        </View>
    );
};
export default HomeScreen;
