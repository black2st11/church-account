import axios from "axios";

const DEFAULT_API_URL = "http://localhost:8000/api"

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
        console.log(ids)
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
