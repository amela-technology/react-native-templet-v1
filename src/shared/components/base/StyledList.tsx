import React, {useRef, useState} from "react"
import {ActivityIndicator, FlatList, FlatListProps, RefreshControl, View} from "react-native"
import {Themes} from "../../../assets/themes"
import NoData from "./StyledNoData"

interface Props extends FlatListProps<any> {
    [key: string]: any

    loading?: boolean
    data: any[]
    noDataText?: string
    ListHeaderComponent?: any
    scrollEnabled?: boolean
    noDataRefreshable?: boolean

    customStyle?: any

    onLoadMore?(): void

    onNoDataRefresh?(): void
}

const StyledList = (props: Props) => {
    const [momentumScrolled, setMomentumScrolled] = useState(false)
    const list: any = useRef(null)

    const {loading, data, ListHeaderComponent, refreshing, customStyle} = props
    const contentContainerStyle: any = {}
    const hasData = data.length !== 0
    if (!hasData) {
        contentContainerStyle.flex = 1
        contentContainerStyle.alignItems = "center"
        contentContainerStyle.justifyContent = "center"
    }
    let styles
    if (typeof ListHeaderComponent === "undefined" && !hasData) {
        styles = [contentContainerStyle, customStyle]
    } else {
        styles = customStyle
    }

    function keyExtractor(item: any, i: any): string {
        return `${i}`
    }

    function handleRefresh() {
        props.onRefresh && props.onRefresh()
    }

    function handleEndReached(info: any) {
        if (!momentumScrolled) {
            props.onLoadMore && props.onLoadMore()
            setMomentumScrolled(true)
        }
    }

    function handleNoDataRefresh() {
        const {onNoDataRefresh} = props
        onNoDataRefresh?.()
    }

    function onMomentumScrollBegin() {
        setMomentumScrolled(false)
    }

    function scrollToFooter() {
        list?.scrollToEnd({animated: true})
    }

    function scrollToTop() {
        list?.scrollTo({y: 0, animated: true})
    }

    function renderFooter() {
        if (hasData && loading !== undefined && !!loading) {
            return (
                <View style={{alignItems: "center", marginVertical: 8}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return null
    }

    function renderNoData() {
        const {noDataText, noDataRefreshable} = props
        return (
            <NoData
                loading={loading}
                text={noDataText}
                refreshable={noDataRefreshable}
                onRefresh={handleNoDataRefresh}
            />
        )
    }

    return (
        <FlatList
            ref={list}
            contentContainerStyle={styles}
            data={data}
            keyExtractor={keyExtractor}
            initialNumToRender={1}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={onMomentumScrollBegin}
            ListEmptyComponent={renderNoData}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={!!refreshing}
                    colors={[]}
                    tintColor={Themes.colors.primary}
                    onRefresh={handleRefresh}
                />
            }
            keyboardShouldPersistTaps={"handled"}
            {...props}
        />
    )
}

export default StyledList
