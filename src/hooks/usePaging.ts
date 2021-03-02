import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { store } from 'app-redux/store';
import { logger } from 'utilities/helper';

const SIZE_LIMIT = 10;

const usePaging = (
    requestPaging: (config: AxiosRequestConfig) => Promise<any>,
    initialParams?: any,
    onSuccess?: (data?: any, cbParams?: any) => void,
    onError?: (error: Error, cbParams?: any) => void,
) => {
    const [pagingData, setPagingData] = useState({
        refreshing: false,
        loadingMore: false,
        pageIndex: 1,
        list: [],
        noMore: false,
    });
    const [params, setParams] = useState<any>(initialParams);
    useEffect(() => {
        runRequest(pagingData.pageIndex, SIZE_LIMIT, params);
    }, [pagingData.pageIndex]);
    useEffect(() => {
        onRefresh();
    }, [params]);
    const handleOnSuccess = (data: any) => {
        const newList: [] = data.data || [];
        const tempData = {
            ...pagingData,
            noMore: pagingData.pageIndex >= data?.totalPages,
            refreshing: false,
            loadingMore: false,
        };
        if (pagingData.pageIndex === 1) {
            setPagingData({
                ...tempData,
                list: newList,
            });
        } else if (newList.length > 0) {
            setPagingData({
                ...tempData,
                list: [...pagingData.list, ...newList],
            });
        }
    };
    const runRequest = async (requestPageIndex: number, pageSize?: number, otherParams?: any) => {
        try {
            const res = await requestPaging({
                params: {
                    pageIndex: requestPageIndex,
                    pageSize: pageSize || SIZE_LIMIT,
                    ...otherParams,
                },
            });
            handleOnSuccess(res);
        } catch (error) {
            setPagingData({ ...pagingData, refreshing: false, loadingMore: false });
            logger(error);
        }
    };
    const onRefresh = () => {
        if (pagingData.pageIndex > 1) {
            setPagingData({ ...pagingData, refreshing: true, pageIndex: 1 });
        } else {
            runRequest(1, SIZE_LIMIT, params);
        }
    };

    const onLoadMore = () => {
        if (!pagingData.noMore) {
            setPagingData({
                ...pagingData,
                loadingMore: true,
                pageIndex: pagingData.pageIndex + 1,
            });
        }
    };
    return {
        pagingData,
        onRefresh,
        onLoadMore,
        setParams,
        setPagingData,
    };
};

export default usePaging;
