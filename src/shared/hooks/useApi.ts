import axios, {AxiosResponse, Method} from "axios"
import {useEffect, useState} from "react"
import Api from "../../services/request/RequestServices"

const {CancelToken} = axios

export interface State {
    isLoading: boolean
    data?: any
    error?: any
    response?: AxiosResponse<any>
}

function useAPI(method: Method, url: string, initialRequest = true) {
    const [state, setState] = useState<State>({
        isLoading: true,
    })

    const source = CancelToken.source()

    function request() {
        Api(url, {
            method: method,
            cancelToken: source.token,
        })
            .then(response => {
                setState({error: undefined, response, isLoading: false})
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    console.log("Request canceled by cleanup: ", error.message)
                } else {
                    setState({error, response: undefined, isLoading: false})
                }
            })
    }

    useEffect(() => {
        setState({...state, isLoading: true})

        if (initialRequest) {
            request()
        }

        return () => {
            source.cancel("useEffect cleanup...")
        }
    }, [url])

    const {response, error, isLoading} = state

    function setData(newData: any) {
        // Used to update state from component
        const newResponse: any = {...response, data: newData}
        setState({...state, response: newResponse})
    }

    const data = response ? response.data : undefined
    return {isLoading, data, response, error, request, setData}
}

export default useAPI
