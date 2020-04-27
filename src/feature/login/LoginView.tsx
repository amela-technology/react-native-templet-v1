import * as React from 'react'
import { View, SafeAreaView } from 'react-native'
import ModalInputView from './components/ModalInputView'

const LoginView = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ModalInputView />
            </View>
        </SafeAreaView>
    )
}

export default LoginView
