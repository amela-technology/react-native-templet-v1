import * as React from 'react'
import { View } from 'react-native'
import StyledText from 'shared/components/base/StyledText'
import { StyledButton } from 'shared/components/base'
import AuthenticateService from 'services/authenticate/AuthenticateService'

const SettingView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText>Setting</StyledText>
            <StyledButton onPress={() => AuthenticateService.logOut()} title={'Log out'} />
        </View>
    )
}
export default SettingView
