import {useEffect, useState} from "react"

export type UseInfinityScroll = [boolean, any[], () => void, () => void]

export interface Pagination {
    currentPage: any
    lastIndex?: number
    lastItem?: any
}

export const useInfinityScroll = (
    callback: (options: Pagination) => void,
): UseInfinityScroll => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const onRefresh = () => {
        setCurrentPage(1)
        setData([])
        setIsFetching(true)
    }

    const onLoadMore = () => {
        setIsFetching(true)
    }

    const loadEffect = () => {
        let didCancel = false
        if (!isFetching) {
            return
        }

        const loadAsync = async () => {
            const lastIndex = data.length
            const lastItem = data.length ? data[lastIndex - 1] : null
            const options = {currentPage, lastIndex, lastItem}
            const newData: any = await callback(options)
            // TODO Kiểm tra thêm trường hợp nếu không có dữ liệu hoặc tải lỗi
            if (!didCancel) {
                setData((prevState): any => [...prevState, ...newData])
                setIsFetching(false)
                if (newData.length > 0) {
                    setCurrentPage(currentPage + 1)
                }
            }
        }

        loadAsync()

        return () => {
            didCancel = true
        }
    }

    useEffect(loadEffect, [isFetching])

    return [isFetching, data, onLoadMore, onRefresh]
}

export default useInfinityScroll
