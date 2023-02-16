import { LoginBodyRequest, RegisterBodyRequest } from "../common/type";
import axios, { AxiosError } from "axios";
import { response } from "express";
import Cookies from 'js-cookie';

const url = "api/user"

const loginUser = (bodyRequest: LoginBodyRequest, callback: (mesage: String | null, statusCode: Number | null, error: any) => void) => {
    let queryUrl = `${url}/login`;
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

const registerUser = (bodyRequest: RegisterBodyRequest, callback: (mesage: String | null, statusCode: Number | null, error: any) => void) => {
    let queryUrl = `${url}/register`;
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

const authorizeUser = (callback: (data: String | null, message: String | null, statusCode: Number | null, error: any) => void) => {
    let queryUrl = `${url}/authorize`;
    console.log(Cookies.get("authToken"));
    axios.get(queryUrl, {withCredentials: true}).then(response => {
        const { message, data, statusCode } = response.data;
        callback(data, message, statusCode, null);
    }).catch((error: AxiosError) => {
        const {response} = error;
        callback(null, null, null, response?.data);
    });
}

export { loginUser, registerUser, authorizeUser}