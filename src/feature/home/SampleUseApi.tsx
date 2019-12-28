import React from "react"
import {View, Text} from "react-native"
import useAPI from "../../shared/hooks/useApi"

const SampleUseApi = () => {
    // // const {data = [], error, isLoading} = useAPI(`https://api.github.com/search/commits?q=repo:facebook/react+css`, {
    //     method: "GET",
    //     headers: new Headers({
    //         Accept: "application/vnd.github.cloak-preview",
    //     }),
    // })
    // if (error) {
    //     return <Text>Error</Text>
    // }
    //
    // if (isLoading) {
    //     return <Text>Loading.....</Text>
    // }
    // return (
    //     <View>
    //         {data.map((item: any) => {
    //             return <Text key={`${item}`}>{item.commit.message}</Text>
    //         })}
    //     </View>
    // )
}
export default SampleUseApi
