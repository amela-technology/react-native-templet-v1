import React, { useRef, useState } from 'react'
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl, View } from 'react-native'
import { Themes } from 'assets/themes'
import NoData from './StyledNoData'

interface Props extends FlatListProps<any> {
    [key: string]: any
    loading?: boolean
    data: any[]
    noDataText?: string
    ListHeaderComponent?: React.FunctionComponent
    scrollEnabled?: boolean
    noDataCanRefresh?: boolean
    customStyle?: any
    onLoadMore?(): void
    onNoDataRefresh?(): void
}

const StyledList = (props: Props) => {
    const [momentumScrolled, setMomentumScrolled] = useState(false)
    const list: any = useRef(null)

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
        props?.onRefresh?.()
    }

    const handleEndReached = (info: any) => {
        if (!momentumScrolled) {
            props?.onLoadMore?.()
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
        const { noDataText, noDataCanRefresh: noDataCanRefresh } = props
        return (
            <NoData
                loading={loading}
                text={noDataText}
                redressable={noDataCanRefresh}
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
            keyboardShouldPersistTaps={'handled'}
            {...props}
        />
    )
}

export default React.memo(StyledList)
