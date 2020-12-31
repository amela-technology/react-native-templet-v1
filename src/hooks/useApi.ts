import axios, { Method } from 'axios';
import { useEffect, useState } from 'react';
import requestToApi from 'api/request';
import { logger } from 'utilities/helper';

const { CancelToken } = axios;
export interface State {
    loading: boolean;
    error?: any;
    response?: any;
}

const useAPI = (method: Method, url: string, initialRequest = true) => {
    const [state, setState] = useState<State>({
        loading: true,
    });

    const source = CancelToken.source();

    const request = async () => {
        try {
            const responseApi: any = await requestToApi(url, {
                method,
                cancelToken: source.token,
            });
            setState({ error: undefined, response: responseApi, loading: false });
        } catch (errorApi) {
            if (axios.isCancel(errorApi)) {
                logger('Request canceled by cleanup: ', false, errorApi.message);
            } else {
                setState({ error: errorApi, response: undefined, loading: false });
            }
        }
    };

    useEffect(() => {
        setState({ ...state, loading: true });

        if (initialRequest) {
            const doStuff = async () => {
                await request();
            };
            doStuff();
        }

        return () => {
            source.cancel('useEffect cleanup...');
        };
    }, [url, initialRequest]);

    const { response, error, loading } = state;

    // const setData = (newData: any) => {
    //     // Used to update state from component
    //     const newResponse: any = { ...response, data: newData }
    //     setState({ ...state, response: newResponse })
    // }

    const data = response ? response.data : [];
    return { loading, data, response, error, request };
};

export default useAPI;
