import request from "./config/request"
import {USER_URL} from "./config/urls"

const UserApi = {
    login: async (email: string, password: string) => {
        return await request.post(USER_URL.getInfo, {
            email,
            password,
        })
    },
}
export default UserApi
