import * as React from "react"
import {View} from "react-native"
import useInfinityScroll, {Pagination} from "../../shared/hooks/useInfinityScroll"
import ApiService from "../../services/api/config/request"
import {AUTH_URL} from "../../services/api/config/urls"
import {StyledList} from "../../shared/components/base"
import StyledText from "../../shared/components/base/StyledText"

const HomeView = () => {
    const fetchMoreListItems = async (options: Pagination) => {
        const {currentPage, lastIndex, lastItem} = options
        console.log(options)
        try {
            const response = await ApiService.get(AUTH_URL.login + "?q=repo:facebook/react+css")
            if (response.data.items) {
                return response.data.items
            }
            return []
        } catch (e) {
            console.log(e)
            return []
        }
    }
    const _ahihi = () => {
        return {
            ahihi: "ahihi",
        }
    }
    const [loading, data, onLoadMore, onRefresh] = useInfinityScroll(fetchMoreListItems)

    function renderItem({item, index}: any) {
        return <StyledText customStyle={{height: 50}} text={item.commit.message} />
    }

    return (
        <View>
            {/*<StyledText text={i18n.t("base.defaultLanguage")} />*/}
            <StyledList
                loading={loading}
                data={data}
                renderItem={renderItem}
                refreshing={false}
                onRefresh={onRefresh}
                onLoadMore={onLoadMore}
            />
        </View>
    )
}
export default HomeView
