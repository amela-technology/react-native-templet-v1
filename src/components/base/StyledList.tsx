import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FlatList, FlatListProps, RefreshControl, View, TextStyle, StyleProp, ViewStyle } from 'react-native';
import { Themes } from 'assets/themes';
import { useTranslation } from 'react-i18next';
import NoData from './StyledNoData';
import StyledIndicator from './StyledIndicator';

interface Props extends FlatListProps<any> {
    [key: string]: any;
    FlatListComponent?: React.FunctionComponent<any>;
    loading?: boolean;
    data: any[];
    loadingMore?: boolean;
    noDataText?: string;
    ListHeaderComponent?: any;
    scrollEnabled?: boolean;
    noDataCanRefresh?: boolean;
    i18Params?: any;
    noDataTextI18Key?: any;
    noDataStyle?: StyleProp<ViewStyle>;
    customStyle?: any;

    onLoadMore?(): void;

    onNoDataRefresh?(): void;
}

const StyledList = (props: Props, ref: any) => {
    const [momentumScrolled, setMomentumScrolled] = useState(false);
    const list = useRef<FlatList>(null);
    const { t } = useTranslation();
    const { loading, loadingMore, data, ListHeaderComponent, refreshing, customStyle } = props;
    const contentContainerStyle: StyleProp<ViewStyle> = {};
    const hasData = data?.length !== 0;

    if (!hasData) {
        contentContainerStyle.flex = 1;
        // contentContainerStyle.alignItems = 'center'
        // contentContainerStyle.justifyContent = 'center'
    }

    let styles: StyleProp<ViewStyle>;
    if (typeof ListHeaderComponent === 'undefined' && !hasData) {
        styles = [contentContainerStyle, customStyle];
    } else {
        styles = customStyle;
    }

    function keyExtractor(item: any, i: any): string {
        return `${i}`;
    }

    function handleRefresh() {
        if (props.onRefresh) props.onRefresh();
    }

    // Bởi vì onEnReached call nhiều lần nên phải trick để chỉ call 1 lần thôi
    useEffect(() => {
        if (momentumScrolled) {
            setMomentumScrolled(true);
            if (props.onLoadMore) props.onLoadMore();
        }
    }, [momentumScrolled]);

    function handleEndReached(info: any) {
        if (!momentumScrolled) {
            setMomentumScrolled(true);
        }
    }

    function handleNoDataRefresh() {
        const { onNoDataRefresh } = props;
        if (onNoDataRefresh) onNoDataRefresh();
    }

    function onMomentumScrollBegin() {
        setMomentumScrolled(false);
    }

    React.useImperativeHandle(ref, () => ({
        scrollToTop: () => {
            list?.current?.scrollToOffset({ animated: true, offset: 0 });
        },
    }));

    function renderFooter() {
        if (hasData && loadingMore) {
            return (
                <View style={{ alignItems: 'center', marginVertical: 8 }}>
                    <StyledIndicator size={24} />
                </View>
            );
        }
        return null;
    }

    function renderNoData() {
        const { noDataText, noDataTextI18Key, noDataCanRefresh } = props;
        return (
            <NoData
                customStyle={props.noDataStyle}
                loading={loading}
                text={noDataTextI18Key ? t(noDataTextI18Key, props.i18Params) : noDataText}
                canRefresh={noDataCanRefresh}
                onRefresh={handleNoDataRefresh}
            />
        );
    }

    const FlatListComponent: any = useMemo(() => {
        return props?.FlatListComponent || FlatList;
    }, [props?.FlatListComponent]);

    return (
        <FlatListComponent
            ref={list}
            contentContainerStyle={styles}
            keyExtractor={keyExtractor}
            initialNumToRender={10}
            // onEndReached={handleEndReached}
            onEndReachedThreshold={0.01}
            onMomentumScrollBegin={onMomentumScrollBegin}
            ListEmptyComponent={renderNoData}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={!!refreshing}
                    colors={[Themes.COLORS.primary]}
                    tintColor={Themes.COLORS.primary}
                    onRefresh={handleRefresh}
                />
            }
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps={'never'}
            {...props}
        />
    );
};

export default React.memo(React.forwardRef(StyledList));
