import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StyledText } from 'components/base';

const ForgotPassword: React.FunctionComponent = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <StyledText originValue={'Forgot password screen'} />
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
