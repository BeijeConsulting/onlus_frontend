import axios from "axios";
import PROPERTIES from "../utils/properties";

const axiosInstance = axios.create({
    baseURL: PROPERTIES.BASEURL,
    timeout: PROPERTIES.TIMEOUT
})

export function responseApi(response) {
    return{
        data: response?.data,
        status: response?.status
    }
}
export function responseApiError(error) {
    return{
        message: error?.message,
        status: error?.status
    }
}

export async function getApi(resource, header = null){
    return axiosInstance
        .get(resource, {
            headers: header !== null ? {Authorization: `Bearer ${header}`} : "",
        })
        .then((response) => {return responseApi(response)})
        .catch((error) => {return responseApiError(error)})
}

export async function postApi(resource, obj, header = null){
    return axiosInstance
        .post(resource, obj, {
            headers: header !== null ? {Authorization: `Bearer ${header}`} : "",
        })
        .then((response) => {return responseApi(response)})
        .catch((error) => {return responseApiError(error)})
}

export async function putApi(resource, obj, header = null){
    return axiosInstance
        .put(resource, obj, {
            headers: header !== null ? {Authorization: `Bearer ${header}`} : "",
        })
        .then((response) => {return responseApi(response)})
        .catch((error) => {return responseApiError(error)})
}

export async function deleteApi(resource, header = null){
    return axiosInstance
        .delete(resource, {
            headers: header !== null ? {Authorization: `Bearer ${header}`} : "",
        })
        .then((response) => {return responseApi(response)})
        .catch((error) => {return responseApiError(error)})
}