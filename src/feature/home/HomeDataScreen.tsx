import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';

const HomeDataScreen: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <StyledHeader title={'Home Data'} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeDataScreen;
