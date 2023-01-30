import { BookBodyRequest } from "../common/type";
import "axios"
import axios, { AxiosError } from "axios";

const url = "http://127.0.0.1:5000/api/books"

const listBooks = (title: String | null, from: String | null, to: String | null, callback: any) => {
    let queryParams: Array<String> = [];
    if (title !== "" && title !== null) {
        queryParams.push(`title=${title}`);
    }
    if (from !== "" && from !== null) {
        queryParams.push(`from=${from}`);
    }
    if (to !== "" && to !== null) {
        queryParams.push(`to=${to}`);
    }
    const queryParamsStr = queryParams.join("&");

    const queryUrl = `${url}?${queryParamsStr}`;

    axios.get(queryUrl).then(response => {
        const { data, message, statusCode } = response.data;
        callback(data, message, statusCode);
    }).catch((error: AxiosError) => {
        const { response } = error;
        callback(null, null, response?.data);
    });
}

const createBook = async (bodyRequest: BookBodyRequest, callback: any) => {
    let queryUrl = url;
    const headers = {
        "Content-Type": "application/json"
    }

    axios.post(queryUrl, bodyRequest, { headers }).then(response => {
        const { message, statusCode } = response.data;
        callback(message, statusCode, null);
    }).catch((error: AxiosError) => {
        const { response } = error;
        callback(null, null, response?.data);
    });
}

export { listBooks, createBook }