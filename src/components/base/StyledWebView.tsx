import * as React from 'react';
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
                    <View style={{ flex: 1 }}>
                        <ActivityIndicator size={'large'} />
                    </View>
                )}
                renderError={(errorName) => (
                    <View style={{ flex: 1 }}>
                        <StyledText>{`Error name: ${errorName}`}</StyledText>
                        <StyledText style={{ marginTop: 10 }}>{`Pull down to try again`}</StyledText>
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
});

export default React.memo(StyledWebView);
