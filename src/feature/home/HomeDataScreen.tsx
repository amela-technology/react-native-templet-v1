import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledText from 'components/base/StyledText';
import StyledHeader from 'components/common/StyledHeader';
import { useRequest } from 'ahooks';
import { StyledButton } from 'components/base';
import { getProfile } from 'api/modules/api-app/authenticate';
import UserCard from './components/UserCard';

const HomeDataScreen: React.FunctionComponent = () => {
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Data'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 20,
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeDataScreen;
