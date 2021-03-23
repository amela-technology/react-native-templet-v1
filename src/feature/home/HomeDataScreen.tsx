import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import request from 'api/request';
import { StyledList } from 'components/base';
import usePaging from 'hooks/usePaging';
import { Themes } from 'assets/themes';

const getListShift = ({ params }: any): Promise<any> => {
    return request.post('/owner/shift/status', params);
};
const HomeDataScreen: React.FunctionComponent = () => {
    const { onLoadMore, onRefresh, list, noMore, refreshing, loadingMore, setParams, setList } = usePaging(
        getListShift,
        'cacheList',
        { blockStatus: 2 },
    );
    const renderItem = ({ index }: any) => (
        <View style={styles.itemContainer}>
            <Text>{index}</Text>
        </View>
    );
    return (
        <View>
            <StyledHeader title={'Home Data'} />
            <StyledList
                contentContainerStyle={styles.scene}
                onRefresh={onRefresh}
                loading={loadingMore}
                refreshing={list?.length ? false : refreshing}
                data={list}
                onEndReached={onLoadMore}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        paddingHorizontal: 5,
        flexGrow: 1,
    },
    itemContainer: {
        height: 100,
        backgroundColor: Themes.COLORS.green,
    },
});

export default HomeDataScreen;
