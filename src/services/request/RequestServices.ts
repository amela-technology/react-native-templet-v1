import axios from "axios"
import Config from "react-native-config"

const ApiService = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000,
    headers: {Accept: "application/vnd.github.cloak-preview"},
})
ApiService.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        __DEV__ &&
            console.log(
                `%c ${config.method?.toUpperCase()} from ${config.url}:`,
                "background: " + "yellow" + "; color: #000",
                config,
            )
        return config
    },
    function(error) {
        // Do something with request error
        __DEV__ &&
            console.log(
                `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
                "background: " + "red" + "; color: #fff",
                error.response,
            )
        return Promise.reject(error)
    },
)
ApiService.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        __DEV__ &&
            console.log(
                `%c SUCCESS ${response.config.method?.toUpperCase()} from ${response.config.url}:`,
                "background: " + "green" + "; color: #fff",
                response.data,
            )
        return response
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        __DEV__ &&
            console.log(
                `%c FAILED ${error.response.config.method?.toUpperCase()} from ${error.response.config.url}:`,
                "background: " + "red" + "; color: #fff",
                error.response,
            )
        return Promise.reject(error)
    },
)
export default ApiService
