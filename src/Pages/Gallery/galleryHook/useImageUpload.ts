
import { useState } from "react";
import { uploadImages } from "../../../services/imageService";
import type { ImageItem } from "../../../types/image";

const MAX_IMAGE_COUNT = 10;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_TITLE_LENGTH = 100;

export interface SelectedImage {
    id: string;
    file: File;
    title: string;
    previewUrl: string;
}

interface UseImageUploadResult {
    selectedImages: SelectedImage[];
    isUploading: boolean;
    error: string | null;
    addFiles: (files: FileList | File[]) => void;
    updateTitle: (id: string, title: string) => void;
    removeImage: (id: string) => void;
    submitUpload: () => Promise<ImageItem[] | null>;
    clearSelection: () => void;
}

export function useImageUpload(
    onUploaded: (images: ImageItem[]) => void,
): UseImageUploadResult {
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addFiles = (files: FileList | File[]) => {
        setError(null);

        const incomingFiles = Array.from(files);

        if (selectedImages.length + incomingFiles.length > MAX_IMAGE_COUNT) {
            setError(`You can select up to ${MAX_IMAGE_COUNT} images.`);
            return;
        }

        const invalidFile = incomingFiles.find((file) => {
            return (
                !file.type.startsWith("image/") ||
                file.size === 0 ||
                file.size > MAX_IMAGE_SIZE_BYTES
            );
        });

        if (invalidFile) {
            setError(
                !invalidFile.type.startsWith("image/")
                    ? `"${invalidFile.name}" is not an image file.`
                    : invalidFile.size === 0
                        ? `"${invalidFile.name}" is empty.`
                        : `"${invalidFile.name}" exceeds the 5 MB limit.`,
            );
            return;
        }

        const newImages: SelectedImage[] = incomingFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            title: file.name.replace(/\.[^.]+$/, "").slice(
                0,
                MAX_IMAGE_TITLE_LENGTH,
            ),
            previewUrl: URL.createObjectURL(file),
        }));

        setSelectedImages((current) => [...current, ...newImages]);
    };

    const updateTitle = (id: string, title: string) => {
        setSelectedImages((current) =>
            current.map((image) =>
                image.id === id ? { ...image, title } : image,
            ),
        );
        setError(null);
    };

    const removeImage = (id: string) => {
        setSelectedImages((current) => {
            const image = current.find((item) => item.id === id);

            if (image) {
                URL.revokeObjectURL(image.previewUrl);
            }

            return current.filter((item) => item.id !== id);
        });

        setError(null);
    };

    const clearSelection = () => {
        setSelectedImages((current) => {
            current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
            return [];
        });

        setError(null);
    };

    const submitUpload = async (): Promise<ImageItem[] | null> => {
        if (selectedImages.length === 0) {
            setError("Choose at least one image to upload.");
            return null;
        }

        const invalidTitle = selectedImages.find(
            (image) =>
                !image.title.trim() ||
                image.title.trim().length > MAX_IMAGE_TITLE_LENGTH,
        );

        if (invalidTitle) {
            setError(
                !invalidTitle.title.trim()
                    ? "Every image needs a title."
                    : `Titles must not exceed ${MAX_IMAGE_TITLE_LENGTH} characters.`,
            );
            return null;
        }

        setIsUploading(true);
        setError(null);

        try {
            const uploadedImages = await uploadImages({
                files: selectedImages.map((image) => image.file),
                titles: selectedImages.map((image) => image.title.trim()),
            });

            clearSelection();
            onUploaded(uploadedImages);

            return uploadedImages;
        } catch {
            setError("Upload failed. Please check your connection and try again.");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        selectedImages,
        isUploading,
        error,
        addFiles,
        updateTitle,
        removeImage,
        submitUpload,
        clearSelection,
    };
}
