"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var themes_1 = require("../../assets/themes");
var AMListNoData_1 = require("./AMListNoData");
var AMList = function (props) {
    var _a = react_1.useState(false), momentumScrolled = _a[0], setMomentumScrolled = _a[1];
    var list = react_1.useRef(null);
    var loading = props.loading, data = props.data, ListHeaderComponent = props.ListHeaderComponent, refreshing = props.refreshing, customStyle = props.customStyle;
    var contentContainerStyle = {};
    var hasData = data.length !== 0;
    if (!hasData) {
        contentContainerStyle.flex = 1;
        contentContainerStyle.alignItems = "center";
        contentContainerStyle.justifyContent = "center";
    }
    var styles;
    if (typeof ListHeaderComponent === "undefined" && !hasData) {
        styles = [contentContainerStyle, customStyle];
    }
    else {
        styles = customStyle;
    }
    function keyExtractor(item, i) {
        return "" + i;
    }
    function handleRefresh() {
        props.onRefresh && props.onRefresh();
    }
    function handleEndReached(info) {
        if (!momentumScrolled) {
            props.onLoadMore && props.onLoadMore();
            setMomentumScrolled(true);
        }
    }
    function handleNoDataRefresh() {
        var onNoDataRefresh = props.onNoDataRefresh;
        onNoDataRefresh && onNoDataRefresh();
    }
    function onMomentumScrollBegin() {
        setMomentumScrolled(false);
    }
    function scrollToFooter() {
        list && list.scrollToEnd({ animated: true });
    }
    function scrollToTop() {
        list && list.scrollTo({ y: 0, animated: true });
    }
    function renderFooter() {
        if (hasData && loading !== undefined && !!loading) {
            return (<react_native_1.View style={{ alignItems: "center", marginVertical: 8 }}>
                    <react_native_1.ActivityIndicator />
                </react_native_1.View>);
        }
        return null;
    }
    function renderNoData() {
        var noDataText = props.noDataText, noDataRefreshable = props.noDataRefreshable;
        return (<AMListNoData_1.default loading={loading} text={noDataText} refreshable={noDataRefreshable} onRefresh={handleNoDataRefresh}/>);
    }
    return (<react_native_1.FlatList ref={list} contentContainerStyle={styles} data={data} keyExtractor={keyExtractor} initialNumToRender={1} onEndReached={handleEndReached} onEndReachedThreshold={0.5} onMomentumScrollBegin={onMomentumScrollBegin} ListEmptyComponent={renderNoData} ListFooterComponent={renderFooter} showsVerticalScrollIndicator={false} refreshControl={<react_native_1.RefreshControl refreshing={!!refreshing} colors={[]} tintColor={themes_1.Themes.colors.primary} onRefresh={handleRefresh}/>} keyboardShouldPersistTaps={"handled"} {...props}/>);
};
exports.default = AMList;
