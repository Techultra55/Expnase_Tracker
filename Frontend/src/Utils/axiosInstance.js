import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { use } from "react";

// Create an Axios instance with custom configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Base URL for all requests
    timeout: 10000, // Timeout for requests in milliseconds
    headers: {
        "Content-Type": " application/json", // Set content type for JSON
        Accept: "application/json" // Specify accepted data format
    },
});

// Request Interceptor
// This runs before each request
axiosInstance.interceptors.request.use(
    (config) => {
        // Check for a token in localStorage
        const accessToken = localStorage.getItem("token");
        
        if (accessToken) {
            // Add authorization header to the request
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Return the modified config
        return config;
    },
    (err) => {
        // Handle any request errors
        return Promise.reject(err);
    }
);

// Response Interceptor
// This runs after each response
axiosInstance.interceptors.response.use(
    (response) => {
        // No modifications needed, just return the response
        return response;
    },
    (err) => {
        // Handle common errors globally
        if (err.response) {
            // Check for specific HTTP status codes
            if (err.response.status === 401) {
                // Unauthorized (likely expired token)
                // Redirect to login page
                window.location.href = "/login";
            } else if (err.response.status === 500) {
                // Internal Server Error
                console.error("Server error. Please try again later.");
            }
        } else if (err.code === "ECONNABORTED") {
            // Request timeout
            console.error("Request timeout. Please try again.");
        }

        // Reject the promise with the error to propagate it up the chain
        return Promise.reject(err);
    }
);

// Export the configured axios instance
export default axiosInstance;