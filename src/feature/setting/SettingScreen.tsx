import * as React from 'react';
import { View } from 'react-native';
import StyledText from 'components/base/StyledText';
import { StyledButton } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';

const SettingView: React.FunctionComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText originValue={'Setting'} />
            <StyledButton onPress={AuthenticateService.logOut} title={'Log out'} />
        </View>
    );
};
export default SettingView;
