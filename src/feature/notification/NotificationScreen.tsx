import * as React from 'react';
import { View } from 'react-native';
import StyledText from 'components/base/StyledText';

const NotificationScreen: React.FunctionComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText>Notification</StyledText>
        </View>
    );
};
export default NotificationScreen;
