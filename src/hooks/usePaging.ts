import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const SIZE_LIMIT = 10;

const usePaging = (requestPaging: (config: AxiosRequestConfig) => Promise<any>, initialParams?: any) => {
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
        const responseData = data || {};
        const newList: [] = responseData.data || [];
        if (pagingData.pageIndex === 1) {
            setPagingData({
                ...pagingData,
                list: newList,
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        } else if (newList.length > 0) {
            setPagingData({
                ...pagingData,
                list: [...pagingData.list, ...newList],
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        }
    };

    // config request paging
    const runRequest = async (requestPageIndex: number, pageSize?: number, otherParams?: any) => {
        const res = await requestPaging({
            params: {
                pageIndex: requestPageIndex,
                pageSize: pageSize || SIZE_LIMIT,
                ...otherParams,
            },
        });
        handleOnSuccess(res);
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
        params,
        setParams,
        setPagingData,
    };
};

export default usePaging;
