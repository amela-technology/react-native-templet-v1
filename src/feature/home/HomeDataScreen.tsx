import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import request from 'api/request';
import { StyledList } from 'components/base';
import usePaging from 'hooks/usePaging';
import { Themes } from 'assets/themes';

const getListShift = ({ params }: any): Promise<any> => {
    return request.post('/owner/shift/status', { params });
};
const HomeDataScreen: FunctionComponent = () => {
    const { onLoadMore, onRefresh, pagingData } = usePaging(getListShift, { blockStatus: 2 });
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
                loading={pagingData.loadingMore}
                refreshing={pagingData.list?.length ? false : pagingData.refreshing}
                data={pagingData.list}
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
