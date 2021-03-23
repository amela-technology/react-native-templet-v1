import * as React from 'react';
import { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import { StyledText } from '.';

const StyledWebView = (props: WebViewProps) => {
    return (
        <View style={styles.container}>
            <WebView
                {...props}
                pullToRefreshEnabled
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.flex1}>
                        <ActivityIndicator size={'large'} />
                    </View>
                )}
                renderError={(errorName) => (
                    <View style={styles.flex1}>
                        <StyledText originValue={`Error name: ${errorName}`} />
                        <StyledText customStyle={styles.textPullDown} originValue={'Pull down to try again'} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex1: {
        flex: 1,
    },
    textPullDown: {
        marginTop: 10,
    },
});

export default memo(StyledWebView);
