import axios from 'axios'
import settings from '../settings'

export const loginApi = async ({id, password}) => {
    const res = await axios({
        method: 'post',
        url: `${settings.api_prefix}/token/`,
        data: {
            username:id,
            password: password
        }
    })
    return res
}


export const isLoginedApi = async ({access}) => {
    const res = await axios({
        method: 'post',
        url: `${settings.api_prefix}/token/verify/`,
        data: {
            'token': access
        }
    })

    return res
}

export const refreshTokenApi = async ({refresh}) => {
    const res = await axios({
        method: 'post',
        url: `${settings.api_prefix}/token/refresh/`,
        data: {
            refresh: refresh
        }
    })

    return res
}