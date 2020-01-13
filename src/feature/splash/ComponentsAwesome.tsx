import React, {useEffect} from 'react'
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native'
import {APP_ROUTE} from '../../services/navigation/config/routes'
import Header from '../../shared/components/base/StyledHeader'

const SplashView = () => {
    return (
        <View style={styles.container}>
            <Header title={'Header'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default SplashView
