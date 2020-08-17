import axios from 'axios'
import { useEffect, useState } from 'react'
import requestToApi from 'api/config/request'

const { CancelToken } = axios
const DEFAULT_PAGING = 25
const usePaging = (url: string, params?: any) => {
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState<any | null>()
    const [error, setError] = useState<any | null>()
    const [data, setData] = useState([])
    const [pageIndex, setPageIndex] = useState(1)

    const source = CancelToken.source()
    useEffect(() => {
        const doStuff = async () => {
            await request()
        }
        doStuff()
    }, [])
    useEffect(() => {
        if (pageIndex > 1) {
            const doStuff = async () => {
                await request()
            }
            doStuff()
        }
        return () => {
            source.cancel('useEffect cleanup...')
        }
    }, [pageIndex])

    const onLoadMore = () => {
        setPageIndex(pageIndex + 1)
    }
    const request = async () => {
        setLoading(true)
        try {
            const responseApi = await requestToApi.post(
                url,
                {
                    page_index: pageIndex,
                    page_size: DEFAULT_PAGING,
                    ...params,
                },
                {
                    cancelToken: source.token,
                },
            )
            setLoading(false)
            setResponse(responseApi)
            const responseData = responseApi.data || {}
            const newData: [] = responseData.data || []
            if (newData.length > 0) {
                setData([...data, ...newData])
            }
        } catch (e) {
            setLoading(false)
            setError(e)
            if (axios.isCancel(e)) {
                console.log('Request canceled by cleanup: ', e.message)
            } else {
                setResponse(response)
            }
        }
    }
    const totalItem = response ? response.data.total_item : -1
    const totalPage = response ? response?.data.total_page : -1
    const errorMessage = error ? error.message : undefined
    return {
        loading,
        data,
        response,
        error,
        errorMessage,
        totalItem,
        totalPage,
        onLoadMore,
    }
}

export default usePaging
