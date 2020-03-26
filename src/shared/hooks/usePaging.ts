import axios from 'axios'
import {useEffect, useState} from 'react'
import requestToApi from '../../api/config/request'
const {CancelToken} = axios
const DEFAULT_PAGING = 25
function usePaging(url: string, params?: any) {
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState<any | null>()
    const [error, setError] = useState<any | null>()
    const [data, setData] = useState([])
    const [pageIndex, setPageIndex] = useState(1)

    const source = CancelToken.source()
    useEffect(() => {
        ;(async function () {
            await request()
        })()
    }, [])
    useEffect(() => {
        if (pageIndex > 1) {
            ;(async function () {
                await request()
            })()
        }
        return () => {
            source.cancel('useEffect cleanup...')
        }
    }, [pageIndex])

    function onLoadMore() {
        setPageIndex(pageIndex + 1)
    }
    async function request() {
        setLoading(true)
        try {
            const response = await requestToApi.post(
                url,
                {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    page_index: pageIndex,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    page_size: DEFAULT_PAGING,
                    ...params,
                },
                {
                    cancelToken: source.token,
                },
            )
            setLoading(false)
            setResponse(response)
            const responseData = response.data || {}
            const newData: [] = responseData.data || []
            if (newData.length > 0) {
                setData([...data, ...newData])
            }
        } catch (error) {
            setLoading(false)
            setError(error)
            if (axios.isCancel(error)) {
                console.log('Request canceled by cleanup: ', error.message)
            } else {
                setResponse(response)
            }
        }
    }
    const totalItem = response ? response.data.total_item : -1
    const totalPage = response ? response?.data.total_page : -1
    const errorMessage = error ? error.message : undefined
    return {loading, data, response, error, errorMessage, totalItem, totalPage, onLoadMore}
}

export default usePaging
