
export interface ImageItem {
    id: string;
    title: string;
    order: number;
    secureUrl: string;
    format: string;
    bytes: number;
    width: number;
    height: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UploadImageResponse {
    success: boolean;
    message: string;
    data: ImageItem[];
}

export interface SingleImageResponse {
    success: boolean;
    message: string;
    data: ImageItem;
}

export interface DeleteImageResponse {
    success: boolean;
    message: string;
}
