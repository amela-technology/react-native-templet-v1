import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledText from 'components/base/StyledText';
import StyledHeader from 'components/common/StyledHeader';
import { getUserDetail } from 'api/modules/api-app/general';
import { useRequest } from 'ahooks';
import { StyledButton } from 'components/base';
import UserCard from './components/UserCard';

const HomeDataScreen: React.FunctionComponent = () => {
    const { loading, data, run, error } = useRequest(getUserDetail, {
        manual: true,
    });

    React.useEffect(() => {
        run(Math.floor(Math.random() * 70));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Data'} />
            <View style={styles.container}>
                <StyledButton title={'Get Random User'} onPress={() => run(Math.floor(Math.random() * 70))} />
                {!error ? (
                    <UserCard data={data} loading={loading} />
                ) : (
                    <View style={styles.errorContainer}>
                        <StyledButton title={'Reload'} onPress={() => run(Math.floor(Math.random() * 70))} />
                        <StyledText customStyle={{ marginTop: 20 }} i18nText={error.message} />
                    </View>
                )}
            </View>
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
