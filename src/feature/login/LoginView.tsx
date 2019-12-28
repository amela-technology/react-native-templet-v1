import * as React from "react"
import {Text, View} from "react-native"
import AMButton from "../../shared/components/common/AMButton"
import AMInput from "../../shared/components/common/AMInput"
import AMList from "../../shared/components/common/AMList"

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
