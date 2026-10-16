
import api from "./api";
import { API_AUTH } from "../types/apiRoutes/apiAuth";
import type {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/auth";

export const registerUser = async (input: RegisterRequest,): Promise<RegisterResponse> => {

    const response = await api.post<ApiResponse<RegisterResponse>>(
        API_AUTH.REGISTER,
        input,
    );

    return response.data.data;
};

export const loginUser = async (input: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
        API_AUTH.LOGIN,
        input,
    );

    return response.data.data;
};
