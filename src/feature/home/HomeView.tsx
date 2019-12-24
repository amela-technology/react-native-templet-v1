import * as React from "react"
import {View} from "react-native"
import AMList from "../../shared/components/AMList"
import AMText from "../../shared/components/AMText"
import useInfinityScroll, {Pagination} from "../../shared/hooks/useInfinityScroll"
import i18n from "../../shared/utilities/i18next"

const HomeView = () => {
    const fetchMoreListItems = async (options: Pagination) => {
        const {currentPage, lastIndex, lastItem} = options
        console.log(options)
        try {
            const response = await fetch(
                `https://api.github.com/search/commits?q=repo:facebook/react+css&page=${currentPage}`,
                {
                    method: "GET",
                    headers: new Headers({
                        Accept: "application/vnd.github.cloak-preview",
                    }),
                },
            )
            const json = await response.json()
            console.log(json)
            if (json.items) {
                return json.items
            }
            return []
        } catch (e) {
            return []
        }
    }

    const [loading, data, onLoadMore, onRefresh] = useInfinityScroll(fetchMoreListItems)

    function renderItem({item, index}: any) {
        return <AMText customStyle={{height: 50}} text={item.commit.message} />
    }

    return (
        <View>
            <AMText text={i18n.t("common.defaultLanguage")} />
            <AMList
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
