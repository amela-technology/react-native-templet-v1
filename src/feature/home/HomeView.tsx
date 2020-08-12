import * as React from 'react'
import { View } from 'react-native'
import StyledText from 'shared/components/base/StyledText'

const HomeView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText text={'Home'} />
        </View>
    )
}
export default HomeView
