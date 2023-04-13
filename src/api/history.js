import axios from "axios";

export const DEFAULT_API_URL = "https://black2st11.pythonanywhere.com/api"

export const getHistories = async (date) => {
    try{
        let res = await axios({
            url: `${DEFAULT_API_URL}/history/get_items/?date=${date}`,
            method: "GET",
        })
        return res;
    }catch(error){
        return false;
    }
}

export const getHistory = async (id) => {
    try{
        let res = await axios({
            url: `${DEFAULT_API_URL}/history/${id}/`,
            method: "GET",
        }) 

        return res
    }catch(error){
        return false;
    }
}

export const saveHistory = async ({name, amount, category, date}) => {
    try{
        let res = await axios({
            url: `${DEFAULT_API_URL}/history/`,
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
        console.log(id, name, amount, date)
        let res = await axios({
            url: `${DEFAULT_API_URL}/history/${id}/`,
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
            url: `${DEFAULT_API_URL}/history/discard/`,
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
            url: `${DEFAULT_API_URL}/history/deleted/`,
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
            url: `${DEFAULT_API_URL}/history/recover/`,
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
            url: `${DEFAULT_API_URL}/history/is_active/`,
            method: 'GET',
        })
        return res.data;
    }catch(error){
        return false
    }
}