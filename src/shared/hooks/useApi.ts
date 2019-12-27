import {useEffect, useState} from "react"

function useAPI(url: string, config = {}, initialFetch = true) {
    const [state, setState] = useState({
        response: undefined,
        error: undefined,
        isLoading: true,
    })

    function request() {
        fetch(url, config)
            .then(async response => {
                const json = await response.json()
                const res: any = {error: undefined, response: json, isLoading: false}
                setState(res)
            })
            .catch(error => {
                console.log(error)
                setState({error, response: undefined, isLoading: false})
            })
    }

    useEffect(() => {
        setState({...state, isLoading: true})

        if (initialFetch) {
            request()
        }

        return () => {
            //cancel fetch
        }
    }, [url])

    const {response, error, isLoading}: any = state

    function setData(newData: any) {
        // Used to update state from component
        const newResponse = {...response, data: newData}
        setState({...state, response: newResponse})
    }

    const data = response ? response.items : undefined
    return {data, response, error, isLoading}
}

export default useAPI
