import Axios from 'axios'
import { storageService } from './StorageService'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true,
})

export const httpService = {
    get(endpoint, data, params) {
        return ajax(endpoint, 'GET', data, params)
    },
    post(endpoint, data, params) {
        return ajax(endpoint, 'POST', data, params)
    },
    put(endpoint, data, params) {
        return ajax(endpoint, 'PUT', data, params)
    },
    delete(endpoint, data, params) {
        return ajax(endpoint, 'DELETE', data, params)
    }
}

async function ajax(endpoint, method, data = null, params = null) {
    try {
        console.log("SERVER REQUEST TO " + endpoint + " METHOD " + method)
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params
        })
        return res.data
    } catch (err) {
        if (err.response)
            switch (err.response.status) {
                case 403:
                    storageService.clear();
                    window.location.assign('/sign')
                    throw new Error(err.response.data)
                case 404:
                    throw new Error(err.response.data);
                default:
                    throw new Error(err.response.data);
            }
        else {
            if (err.message === 'Network Error') {
                throw new Error("Network connection failed")
            }
            else {
                throw err.message;
            }
        }
    }
}