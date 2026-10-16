
export interface RegisterRequest {
    email: string;
    phone: string;
    password: string;
}

export interface RegisterResponse {
    id: string;
    email: string;
    phone: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    email: string;
    phone: string;
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
