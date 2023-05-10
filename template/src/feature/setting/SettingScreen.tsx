import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import StyledText from 'components/base/StyledText';
import { StyledButton } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';

const SettingView: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledText originValue={'Setting'} />
            <StyledButton onPress={AuthenticateService.logOut} title={'Log out'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingView;
