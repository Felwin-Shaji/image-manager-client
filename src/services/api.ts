
import axios, { type AxiosError, } from "axios";
import toast from "react-hot-toast";
import { store } from "../store/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (error.code === "ERR_NETWORK") {
            toast.error("Unable to connect to the server.");
        } else if (status === 403) {
            toast.error("Access denied.");
        } else if (status !== undefined && status >= 500) {
            toast.error("Server error. Please try again.");
        } else if (message) {
            toast.error(message);
        }

        return Promise.reject(error);
    },
);

export default api;