import { AuthorBodyRequest } from "../common/type";
import "axios"
import axios, { AxiosError } from "axios";

const url = "/api/authors"

const listAuthors = (name: String | null, callback: any) => {
    let queryUrl = url;
    if (name !== "" && name !== null) {
        queryUrl = `${queryUrl}?name=${name}`
    }

    axios.get(queryUrl).then(response => {
        const { data, message, statusCode } = response.data;
        callback(data, message, statusCode, null);
    }).catch((error: AxiosError) => {
        const { response } = error;
        callback(null, null, null, response?.data);
    });
}

const createAuthor = async (bodyRequest: AuthorBodyRequest, callback: any) => {
    let queryUrl = url;
    const headers = {
        "Content-Type": "application/json"
    }

    axios.post(queryUrl, bodyRequest, { headers }).then(response => {
        const { message, statusCode } = response.data;
        callback(message, statusCode);
    }).catch((error: AxiosError) => {
        const { response } = error;
        callback(null, null, response?.data);
    });
}

const deleteAuthor = async (id: string | null, callback: Function) => {
    let queryUrl = `${url}/${id}`;

    axios.delete(queryUrl).then(response => {
        const {message, statusCode} = response.data;
        callback(message, statusCode, null);
    }).catch((error: AxiosError) => {
        const {response} = error;
        callback(null, null, response?.data);
    });
}


const updateAuthor = async (id: String | null, bodyRequest: AuthorBodyRequest, callback: Function) => {
    let queryUrl: string = `${url}/${id}`;

    const headers = {
        "Content-Type": "application/json"
    }

    axios.put(queryUrl, bodyRequest, { headers }).then(response => {
        const { message, statusCode } = response.data;
        callback(message, statusCode, null);
    }).catch((error: AxiosError) => {
        const { response } = error;
        callback(null, null, response?.data);
    });
}

export { listAuthors, createAuthor, deleteAuthor, updateAuthor}