import * as React from "react"
import {Text, View} from "react-native"
import AMButton from "../../shared/components/AMButton"
import AMInput from "../../shared/components/AMInput"
import AMList from "../../shared/components/AMList"

const LoginView = () => {
    return (
        <View style={{flex: 1}}>
            <Text>I am Login screen</Text>
            <AMButton
                title={"hiihi"}
                onPress={() => {
                    return null
                }}
            />
            <AMInput value={"hiihi"} />
            <AMList
                data={[]}
                renderItem={() => {
                    return null
                }}
            />
        </View>
    )
}
export default LoginView
