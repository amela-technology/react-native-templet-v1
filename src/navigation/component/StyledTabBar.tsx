import React from 'react'
import { TAB_NAVIGATION_ROOT } from '../config/routes'
import { ScaledSheet } from 'react-native-size-matters'
import { Platform, View, TouchableOpacity, Image } from 'react-native'
import Metrics from 'assets/metrics'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { StyledText } from 'shared/components/base'
import { Themes } from 'assets/themes'
import Images from 'assets/images'

const StyledTabBarIcon = ({ name, focus, customStyle }: any) => {
    let iconSource = Images.icons.tab.home
    if (name === TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT) {
        iconSource = focus ? Images.icons.tab.home : Images.icons.tab.home
    } else if (name === TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT) {
        iconSource = focus ? Images.icons.tab.setting : Images.icons.tab.setting
    } else if (name === TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT) {
        iconSource = focus ? Images.icons.tab.notification : Images.icons.tab.notification
    }
    return <Image source={iconSource} style={[styles.tabIcon, customStyle]} />
}

const StyledTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key]

                // config label of navigation
                let label = 'UNKNOWN'
                switch (route.name) {
                    case TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT:
                        label = 'tab.home'
                        break
                    case TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT:
                        label = 'tab.notification'
                        break
                    case TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT:
                        label = 'tab.setting'
                        break
                    default:
                        break
                }

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

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
                        style={[styles.tabButton, { borderTopWidth: isFocused ? 2 : 0, paddingTop: isFocused ? 6 : 8 }]}
                    >
                        <StyledTabBarIcon name={route.name} focus={isFocused} />
                        <StyledText customStyle={styles.tabLabel}>{label}</StyledText>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = ScaledSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginBottom: Platform.OS === 'ios' ? Metrics.safeBottomPadding : 0,
        paddingHorizontal: '20@s',
        borderTopWidth: 1,
        borderTopColor: '#DEE2E6',
        justifyContent: 'space-between',
    },
    tabButton: {
        alignItems: 'center',
        width: '75@s',
        borderTopColor: 'black',
        paddingBottom: '8@vs',
    },
    tabIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    tabLabel: {
        marginTop: 4,
        color: Themes.COLORS.black,
    },
})

export default StyledTabBar
