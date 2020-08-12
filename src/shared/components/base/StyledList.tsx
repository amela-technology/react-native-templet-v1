import React, { useRef, useState } from 'react'
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl, View, StyleProp, TextStyle } from 'react-native'
import { Themes } from 'assets/themes'
import NoData from './StyledNoData'
import { useTranslation } from 'react-i18next'

interface Props extends FlatListProps<any> {
    [key: string]: any
    FlatListComponent?: any
    loading?: boolean
    data: any[]
    loadingMore?: boolean
    noDataText?: string
    ListHeaderComponent?: any
    scrollEnabled?: boolean
    noDataRefreshable?: boolean
    i18Params?: any
    noDataTextI18Key?: any
    noDataStyle?: StyleProp<TextStyle>
    customStyle?: any

    onLoadMore?(): void

    onNoDataRefresh?(): void
}

const StyledList = (props: Props) => {
    const [momentumScrolled, setMomentumScrolled] = useState(false)
    const list: any = useRef(null)
    const { t } = useTranslation()

    const { loading, data, ListHeaderComponent, refreshing, customStyle } = props
    const contentContainerStyle: any = {}
    const hasData = data.length !== 0
    if (!hasData) {
        contentContainerStyle.flex = 1
        contentContainerStyle.alignItems = 'center'
        contentContainerStyle.justifyContent = 'center'
    }
    let styles
    if (typeof ListHeaderComponent === 'undefined' && !hasData) {
        styles = [contentContainerStyle, customStyle]
    } else {
        styles = customStyle
    }

    const keyExtractor = (item: any, i: any): string => {
        return `${i}`
    }

    const handleRefresh = () => {
        props.onRefresh && props.onRefresh()
    }

    const handleEndReached = (info: any) => {
        if (!momentumScrolled) {
            props.onLoadMore && props.onLoadMore()
            setMomentumScrolled(true)
        }
    }

    const handleNoDataRefresh = () => {
        const { onNoDataRefresh } = props
        onNoDataRefresh?.()
    }

    const onMomentumScrollBegin = () => {
        setMomentumScrolled(false)
    }

    const scrollToFooter = () => {
        list?.scrollToEnd({ animated: true })
    }

    const scrollToTop = () => {
        list?.scrollTo({ y: 0, animated: true })
    }

    const renderFooter = () => {
        if (hasData && loading !== undefined && !!loading) {
            return (
                <View style={{ alignItems: 'center', marginVertical: 8 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return null
    }

    const renderNoData = () => {
        const { noDataText, noDataRefreshable } = props
        return (
            <NoData
                customStyle={props.noDataStyle}
                loading={loading}
                text={props.noDataTextI18Key ? t(props.noDataTextI18Key, props.i18Params) : noDataText}
                refreshable={noDataRefreshable}
                onRefresh={handleNoDataRefresh}
            />
        )
    }

    return (
        <FlatList
            ref={list}
            contentContainerStyle={styles}
            keyExtractor={keyExtractor}
            initialNumToRender={1}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
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
            keyboardShouldPersistTaps={'handled'}
            {...props}
        />
    )
}

export default React.memo(StyledList)
