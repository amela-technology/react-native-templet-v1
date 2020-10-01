import { useRequest, useUnmount } from 'ahooks';
import apiGeneral from 'api/modules/api-app/general';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

const { CancelToken } = axios;

const SIZE_LIMIT = 10;

const usePaging = (
    requestPaging: (config: AxiosRequestConfig) => Promise<any>,
    initialParams?: any,
    onSuccess?: (data?: any, cbParams?: any) => void,
    onError?: (error: Error, cbParams?: any) => void,
) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [list, setList] = useState<Array<any>>([]);
    const [error, setError] = useState<Error | null>();
    const [params, setParams] = useState<any>(initialParams);
    const [noMore, setNoMore] = useState(false);
    const source = CancelToken.source();

    const handleOnSuccess = useCallback(
        (data: any, cbParams: any) => {
            const responseData = data || {};
            const newList: [] = responseData || [];
            if (refreshing) {
                setList(newList);
            } else if (newList.length > 0) {
                setList([...list, ...newList]);
            }
            if (newList.length === 0) {
                setNoMore(true);
            } else {
                setNoMore(pageIndex >= responseData?.totalPage);
            }
            setRefreshing(false);
            setLoadingMore(false);
            setError(null);
            onSuccess?.(data, cbParams);
        },
        [onSuccess, pageIndex, params, refreshing],
    );

    const handleOnError = useCallback(
        (e: any, cbParams: any) => {
            setError(error);
            setRefreshing(false);
            setLoadingMore(false);
            onError?.(e, cbParams);
        },
        [onError, pageIndex, refreshing, params],
    );

    const umiRequest = useRequest(requestPaging, {
        loadMore: false,
        manual: true,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        defaultLoading: true,
    });

    // config request paging
    const runRequest = useCallback(
        (requestPageIndex: number, pageSize?: number, otherParams?: any) => {
            umiRequest.run({
                params: {
                    page: requestPageIndex,
                    limit: pageSize || SIZE_LIMIT,
                    ...otherParams,
                },
                cancelToken: source.token,
            });
        },
        [pageIndex, params, source],
    );

    useEffect(() => {
        if (pageIndex > 1) {
            setLoadingMore(true);
        }
        runRequest(pageIndex, SIZE_LIMIT, params);
    }, [pageIndex]);

    useEffect(() => {
        if (!umiRequest.loading) {
            onRefresh();
        }
    }, [params]);

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
        source.cancel('useEffect cleanup...');
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (pageIndex > 1) {
            setPageIndex(1);
        } else {
            runRequest(1, SIZE_LIMIT, params);
        }
    }, [params, pageIndex]);

    const onLoadMore = useCallback(() => {
        if (!loadingMore) {
            setPageIndex(pageIndex + 1);
        }
    }, [pageIndex, loadingMore]);

    return { ...umiRequest, list, noMore, refreshing, loadingMore, onRefresh, onLoadMore, setParams, setList };
};

export default usePaging;
