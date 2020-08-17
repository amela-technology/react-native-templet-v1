import { useRequest, useUnmount } from 'ahooks'
import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import request from 'api/config/request'

const { CancelToken } = axios

async function requestPaging(config: AxiosRequestConfig): Promise<{ success: boolean }> {
    return await request.request(config)
}
const SIZE_LIMIT = 25
const usePaging = (url: any, initialParams?: any, onSuccess?: any, onError?: any) => {
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)
    const [list, setList] = useState<Array<any>>([])
    const [error, setError] = useState<any>()
    const [params, setParams] = useState<any>(initialParams)
    const [noMore, setNoMore] = useState(false)
    const source = CancelToken.source()

    const handleOnSuccess = useCallback(
        (data: any, params: any) => {
            const responseData = data.data || {}
            const newList: [] = responseData.data || []
            if (refreshing) {
                setList(newList)
            } else if (newList.length > 0) {
                setList([...list, ...newList])
            }
            setNoMore(pageIndex >= responseData?.totalPage)
            setRefreshing(false)
            setLoadingMore(false)
            setError(null)
            onSuccess?.(data, params)
        },
        [onSuccess, pageIndex, params, refreshing],
    )
    const handleOnError = useCallback(
        (e: any, params: any) => {
            setError(error)
            setRefreshing(false)
            setLoadingMore(false)
            onError?.(e, params)
        },
        [onError, pageIndex, refreshing, params],
    )

    const umiRequest: any = useRequest(requestPaging, {
        loadMore: false,
        manual: true,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        defaultLoading: true,
    })

    const runRequest = useCallback(
        (params?: any) => {
            umiRequest.run({
                url,
                method: 'POST',
                data: {
                    pageIndex,
                    pageSize: SIZE_LIMIT,
                    ...params,
                },
                config: {
                    cancelToken: source.token,
                },
            })
        },
        [pageIndex, params, source],
    )
    useEffect(() => {
        if (pageIndex > 1) {
            setLoadingMore(true)
        }
        runRequest({
            pageIndex,
            pageSize: SIZE_LIMIT,
            ...params,
        })
    }, [pageIndex])

    useEffect(() => {
        if (!umiRequest.loading) {
            onRefresh()
        }
    }, [params])

    // useEffect(() => {
    //     if (refreshing) {
    //         console.log('refresh')
    //         if (pageIndex > 1) {
    //             setPageIndex(1)
    //         }
    //         if (pageIndex === 1) {
    //             runRequest({
    //                 pageIndex: 1,
    //                 pageSize: SIZE_LIMIT,
    //                 ...params,
    //             })
    //         }
    //     }
    // }, [refreshing, params, pageIndex])
    useUnmount(() => {
        source.cancel('useEffect cleanup...')
    })
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        if (pageIndex > 1) {
            setPageIndex(1)
        } else {
            runRequest({
                pageIndex: 1,
                pageSize: SIZE_LIMIT,
                ...params,
            })
        }
    }, [params, pageIndex])
    const onLoadMore = useCallback(() => {
        if (!loadingMore) {
            setPageIndex(pageIndex + 1)
        }
    }, [pageIndex, loadingMore])
    return { ...umiRequest, list, noMore, refreshing, loadingMore, onRefresh, onLoadMore, setParams, setList }
}
export default usePaging
