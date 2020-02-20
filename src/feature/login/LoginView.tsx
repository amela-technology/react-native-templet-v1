import * as React from "react"
import {Text, View} from "react-native"
import {StyledButton, StyledInput, StyledList} from "../../shared/components/base"

const LoginView = () => {
    return (
        <View style={{flex: 1}}>
            <Text>I am Login screen</Text>
            <StyledButton
                title={"hiihi"}
                onPress={() => {
                    return null
                }}
            />
            <StyledInput value={"hiihi"} />
            <StyledList
                data={[]}
                renderItem={() => {
                    return null
                }}
            />
        </View>
    )
}
export default LoginView
