import { useRequest } from 'ahooks';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const { CancelToken } = axios;
const pageSize = 10;

const usePagingTakeAfter = (
    requestPaging: (config: AxiosRequestConfig) => Promise<any>,
    cacheKey: string,
    initialParams?: any,
    onSuccess?: (data?: any, cbParams?: any) => void,
    onError?: (error: Error, cbParams?: any) => void,
) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [list, setList] = useState<Array<any>>([]);
    const [error, setError] = useState<Error | null>();
    const [params, setParams] = useState<any>(initialParams);
    const [noMore, setNoMore] = useState(false);

    const source = CancelToken.source();
    useEffect(() => {
        runRequest(params);
        return () => {
            source.cancel('useEffect cleanup...');
        };
    }, []);
    useEffect(() => {
        if (refreshing) {
            runRequest({ takeAfter: '' });
        }
    }, [refreshing]);
    useEffect(() => {
        if (!umiRequest.loading) {
            onRefresh();
        }
    }, [params]);
    const handleOnSuccess = (data: any) => {
        const responseData = data?.data || {};
        const newList: [] = responseData || [];
        if (refreshing) {
            setList(newList);
        } else if (newList.length > 0) {
            setList([...list, ...newList]);
        }
        setNoMore(!data?.hasMore);
        setRefreshing(false);
        setLoadingMore(false);
        setError(null);
        onSuccess?.(data);
    };

    const handleOnError = (e: Error) => {
        setError(error);
        setRefreshing(false);
        setLoadingMore(false);
        onError?.(e);
    };

    const umiRequest = useRequest(requestPaging, {
        manual: true,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        defaultLoading: true,
        cacheKey,
    });

    // config request paging
    const runRequest = (otherParams?: any) => {
        const paramsQuery = {
            pageSize,
            takeAfter: list?.[list?.length - 1]?.lastTimeSent,
            ...otherParams,
        };
        umiRequest.run({
            params: paramsQuery,
            cancelToken: source.token,
        });
    };

    const onRefresh = () => {
        setRefreshing(true);
    };

    const onLoadMore = () => {
        if (!noMore) {
            runRequest(params);
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

export default usePagingTakeAfter;
