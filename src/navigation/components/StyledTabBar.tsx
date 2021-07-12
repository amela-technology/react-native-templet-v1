import React from 'react';
import { Platform, View, Image, StyleSheet } from 'react-native';
import Metrics from 'assets/metrics';
import { StyledText, StyledTouchable } from 'components/base';
import { Themes } from 'assets/themes';
import Size from 'assets/sizes';

const StyledTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <StyledTouchable
                        accessibilityRole="button"
                        // accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                        customStyle={[styles.tabButton]}
                    >
                        <Image
                            source={options?.icon}
                            style={[
                                styles.tabIcon,
                                { tintColor: isFocused ? Themes.COLORS.primary : Themes.COLORS.textPrimary },
                            ]}
                        />
                        <StyledText
                            customStyle={[
                                styles.tabLabel,
                                { color: isFocused ? Themes.COLORS.primary : Themes.COLORS.textPrimary },
                            ]}
                            i18nText={options?.title || ''}
                        />
                    </StyledTouchable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? Metrics.safeBottomPadding : 0,
        borderTopColor: '#DEE2E6',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
        height: '8%',
    },
    tabButton: {
        alignItems: 'center',
    },
    tabIcon: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    tabLabel: {
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
    },
});

export default StyledTabBar;
