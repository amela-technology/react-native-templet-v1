import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

const HomeUserListScreen: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledHeader title={'Home User List'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeUserListScreen;
