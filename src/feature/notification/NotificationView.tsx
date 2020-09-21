import * as React from 'react'
import { View } from 'react-native'
import StyledText from 'shared/components/base/StyledText'

const NotificationView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText>Notification</StyledText>
        </View>
    )
}
export default NotificationView
