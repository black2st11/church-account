import axios from "axios";
import settings from "../settings";

const access = localStorage.getItem('access')
const headers = {
    'Authorization': `Bearer ` + access
}
export const getHistories = async (date) => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/get_items/?date=${date}`,
            method: "GET",
            headers
        })
        return res;
    }catch(error){
        return false;
    }
}

export const getHistory = async (id) => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/${id}/`,
            method: "GET",
            headers
        }) 

        return res
    }catch(error){
        return false;
    }
}

export const saveHistory = async ({name, amount, category, date}) => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/`,
            headers,

            method: "POST",
            data: {
                name, amount, category, date
            }
        })

        return res;
    }catch(error){
        return false;
    }
}

export const updateHistory = async ({id, name, amount, category, date}) => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/${id}/`,
            headers,
            method: "PUT",
            data: {
                name, amount, category, date
            }
        })
        return res;
    }catch(error){
        return false;
    }
}

export const deleteHistory = async ({id, ids=[]}) => {
    try{
        ids.push(id)
        let res = await axios({
            url: `${settings.api_prefix}/history/discard/`,
            headers,
            method: "POST",
            data: {
                pk: ids
            }
        })
        return res;
    }catch(error){
        return false;
    }
}

export const getDeletedHistories = async () => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/deleted/`,
            headers,
            method: "GET"
        })

        return res;
    }catch(error){
        return false;
    }
}

export const recoverHistory = async (pk) => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/recover/`,
            headers,
            method: "POST",
            data: {
                pk
            }
        })

        return res;
    }catch(error){
        return false;
    }
}

export const isActive = async () => {
    try{
        let res = await axios({
            url: `${settings.api_prefix}/history/is_active/`,
            headers,
            method: 'GET',
        })
        return res.data;
    }catch(error){
        return false
    }
}

export const getFile = async(url) => {
    try{
        let res = await axios({
            url: url,
            headers,
            method: 'GET'
        })
        return res
    }catch(error){
        return '/'
    }
}
