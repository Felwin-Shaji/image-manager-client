
import { useCallback, useEffect, useState } from "react";
import { getImages } from "../../../services/imageService";
import type { ImageItem } from "../../../types/image";

interface UseGalleryImagesResult {
    images: ImageItem[];
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;
    isLoading: boolean;
    error: string | null;
    retryLoading: () => Promise<void>;
    addUploadedImages: (uploadedImages: ImageItem[]) => void;
}

export function useGalleryImages(): UseGalleryImagesResult {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const retryLoading = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await getImages();
            setImages(result);
        } catch {
            setError("Unable to load your images. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void retryLoading();
    }, [retryLoading]);

    const addUploadedImages = (uploadedImages: ImageItem[]) => {
        setImages((current) => [...current, ...uploadedImages]);
    };

    return {
        images,
        setImages,
        isLoading,
        error,
        retryLoading,
        addUploadedImages,
    };
}
