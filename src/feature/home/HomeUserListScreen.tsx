import * as React from 'react';
import { View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText } from 'components/base';
import { getUsers } from 'api/modules/api-app/general';
import usePaging from 'hooks/usePaging';

const HomeUserListScreen: React.FunctionComponent = () => {
    const { list, loading, loadingMore, onLoadMore, refreshing, onRefresh } = usePaging(getUsers);
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home User List'} />
            <View style={{ flex: 1 }}>
                <StyledList
                    customStyle={{}}
                    data={list}
                    loading={loading}
                    loadingMore={loadingMore}
                    onLoadMore={onLoadMore}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    numColumns={1}
                    noDataStyle={{ paddingTop: 140 }}
                    noDataTextI18Key={'No data'}
                    renderItem={({ item }: any) => (
                        <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <StyledText originValue={item?.name || ''} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
export default HomeUserListScreen;
