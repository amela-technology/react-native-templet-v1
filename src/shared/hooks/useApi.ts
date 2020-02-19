import axios, {AxiosResponse, Method} from 'axios'
import {useEffect, useState} from 'react'
import requestToApi from 'api/config/request'
const {CancelToken} = axios
export interface State {
    loading: boolean
    error?: any
    response?: any
}

function useAPI(method: Method, url: string, initialRequest = true) {
    const [state, setState] = useState<State>({
        loading: true,
    })

    const source = CancelToken.source()

    async function request() {
        try {
            const response: any = await requestToApi(url, {
                method: method,
                cancelToken: source.token,
            })
            setState({error: undefined, response, loading: false})
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled by cleanup: ', error.message)
            } else {
                setState({error, response: undefined, loading: false})
            }
        }
    }

    useEffect(() => {
        setState({...state, loading: true})

        if (initialRequest) {
            ;(async function() {
                await request()
            })()
        }

        return () => {
            source.cancel('useEffect cleanup...')
        }
    }, [url, initialRequest])

    const {response, error, loading} = state

    function setData(newData: any) {
        // Used to update state from component
        const newResponse: any = {...response, data: newData}
        setState({...state, response: newResponse})
    }

    const data = response ? response.data : []
    return {loading, data, response, error, request}
}

export default useAPI
