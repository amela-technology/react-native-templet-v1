import * as React from 'react'
import { View, SafeAreaView } from 'react-native'
import { StyledButton } from 'shared/components/base'

import { useLogin } from 'services/authenticate/AuthenticateService'
import StyledOverlayLoading from 'shared/components/base/StyledOverlayLoading'

const LoginView = () => {
    const { loading, login, error } = useLogin({ username: '2313123', password: '231231313' })

    const doLogin = () => {
        login()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledOverlayLoading visible={loading} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <StyledButton onPress={doLogin} title={'Log in'} />
            </View>
        </SafeAreaView>
    )
}

export default LoginView
