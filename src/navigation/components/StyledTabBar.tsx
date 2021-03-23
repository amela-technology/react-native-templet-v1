import React, { FunctionComponent } from 'react';
import { Platform, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Metrics from 'assets/metrics';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyledText } from 'components/base';
import { Themes } from 'assets/themes';
import Size from 'assets/sizes';

const StyledTabBar: FunctionComponent<BottomTabBarProps> = ({ state, descriptors, navigation }: BottomTabBarProps) => {
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
                    <TouchableOpacity
                        activeOpacity={1}
                        accessibilityRole="button"
                        // accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                        style={[
                            styles.tabButton,
                            {
                                backgroundColor: isFocused ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.25)',
                            },
                        ]}
                    >
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Image source={options?.icon} style={[styles.tabIcon]} tintColor={Themes.COLORS.white} />
                        <StyledText customStyle={styles.tabLabel} i18nText={options?.title || ''} />
                    </TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabButton: {
        marginHorizontal: 5,
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 50,
        alignItems: 'center',
    },
    tabIcon: {
        width: 17,
        height: 17,
        resizeMode: 'contain',
        tintColor: Themes.COLORS.white,
    },
    tabLabel: {
        color: Themes.COLORS.white,
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
    },
});

export default StyledTabBar;
