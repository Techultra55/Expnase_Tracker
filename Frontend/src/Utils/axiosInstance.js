import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { use } from "react";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": " application/json",
        Accept: "application/json"
    },

});


//Request interceptor

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);


//Response Interceptoor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (err) => {
        //Handle common errors globally

        if (err.response) {
            if (err.response.status === 401) {
                //Redirect to login page 
                window.location.href = "/login";
            } else if (err.response.status === 500) {
                console.err("server error. Please try again later.");
            }
        }
        else if (err.code === "ECONNABORTED") {
            console.err("Request timeout. Please try again.");
        }

        return Promise.reject(err);
    }
)

export default axiosInstance;