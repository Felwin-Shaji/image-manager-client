
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { store } from "../store/store";
import { setCredentials, clearCredentials, } from "../store/slices/authSlice";
import { refreshAccessToken } from "./authService";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: ReturnType<typeof refreshAccessToken> | null = null;

api.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.data instanceof FormData) {
            config.headers.delete("Content-Type");
        }

        return config;
    },
    (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message?: string }>) => {
        const originalRequest =
            error.config as RetryableRequestConfig | undefined;

        const status = error.response?.status;
        const url = originalRequest?.url ?? "";

        const isAuthRequest =
            url.includes("/auth/login") ||
            url.includes("/auth/register") ||
            url.includes("/auth/refresh") ||
            url.includes("/auth/logout");

        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isAuthRequest
        ) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshAccessToken().finally(() => {
                        refreshPromise = null;
                    });
                }

                const session = await refreshPromise;

                store.dispatch(
                    setCredentials({
                        accessToken: session.accessToken,
                        user: session.user,
                    }),
                );

                originalRequest.headers.Authorization =
                    `Bearer ${session.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearCredentials());
                return Promise.reject(refreshError);
            }
        }

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
