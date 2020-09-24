import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StyledText } from 'components/base';

const RegisterScreen: React.FunctionComponent = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <StyledText>{'Register screen'}</StyledText>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
