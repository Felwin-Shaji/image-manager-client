
import api from "./api";
import type { ImageItem, UploadImageResponse } from "../types/image";
import { API_IMAGES } from "../types/apiRoutes/apiImage";

export interface UploadImageInput {
    files: File[];
    titles: string[];
}

export const uploadImages = async ({
    files,
    titles,
}: UploadImageInput): Promise<ImageItem[]> => {
    if (files.length === 0) {
        throw new Error("At least one image is required.");
    }

    if (files.length !== titles.length) {
        throw new Error("Each image must have exactly one title.");
    }

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("images", file);
    });

    formData.append("titles", JSON.stringify(titles));

    const response = await api.post<UploadImageResponse>(
        API_IMAGES.UPLOAD,
        formData,
    );

    return response.data.data;
};

export const getImages = async (): Promise<ImageItem[]> => {
    const response = await api.get<UploadImageResponse>(
        API_IMAGES.GET_ALL,
    );

    return response.data.data;
};