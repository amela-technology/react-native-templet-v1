import { useRequest, useUnmount } from 'ahooks';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const { CancelToken } = axios;

const SIZE_LIMIT = 10;

const usePaging = (
    requestPaging: (config: AxiosRequestConfig) => Promise<any>,
    cacheKey: string,
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
    useEffect(() => {
        if (pageIndex > 1) {
            setLoadingMore(true);
        }
        runRequest(pageIndex, SIZE_LIMIT, params);
    }, [pageIndex]);
    useEffect(() => {
        if (refreshing) {
            setPageIndex(1);
        }
    }, [refreshing]);
    useEffect(() => {
        if (!umiRequest.loading) {
            onRefresh();
        }
    }, [params]);
    const handleOnSuccess = (data: any, cbParams: any) => {
        const responseData = data || {};
        const newList: [] = responseData.data || [];
        if (refreshing) {
            setList(newList);
        } else if (newList.length > 0) {
            setList([...list, ...newList]);
        }
        setNoMore(pageIndex >= responseData?.totalPages);
        setRefreshing(false);
        setLoadingMore(false);
    };

    const handleOnError = (e: Error, cbParams: any) => {
        setError(error);
        setRefreshing(false);
        setLoadingMore(false);
        onError?.(e, cbParams);
    };

    const umiRequest = useRequest(requestPaging, {
        loadMore: false,
        manual: true,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        defaultLoading: true,
        cacheKey,
    });

    // config request paging
    const runRequest = (requestPageIndex: number, pageSize?: number, otherParams?: any) => {
        umiRequest.run({
            params: {
                pageIndex: requestPageIndex,
                pageSize: pageSize || SIZE_LIMIT,
                ...otherParams,
            },
            cancelToken: source.token,
        });
    };

    useUnmount(() => {
        source.cancel('useEffect cleanup...');
    });

    const onRefresh = () => {
        setRefreshing(true);
    };

    const onLoadMore = () => {
        if (!noMore) {
            setLoadingMore(true);
            setPageIndex(pageIndex + 1);
        }
    };

    return {
        ...umiRequest,
        list: list?.length ? list : umiRequest?.data?.data,
        noMore,
        refreshing,
        loadingMore,
        onRefresh,
        onLoadMore,
        setParams,
        setList,
    };
};

export default usePaging;
