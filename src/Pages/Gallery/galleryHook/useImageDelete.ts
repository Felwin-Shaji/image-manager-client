
import { useState } from "react";
import { deleteImage } from "../../../services/imageService";

interface UseImageDeleteResult {
    deletingImageId: string | null;
    deleteError: string | null;
    deleteImageById: (
        imageId: string,
        onDeleted: (imageId: string) => void,
    ) => Promise<void>;
    clearDeleteError: () => void;
}

export function useImageDelete(): UseImageDeleteResult {
    const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const clearDeleteError = () => setDeleteError(null);

    const deleteImageById = async (
        imageId: string,
        onDeleted: (imageId: string) => void,
    ): Promise<void> => {
        setDeletingImageId(imageId);
        setDeleteError(null);

        try {
            await deleteImage(imageId);
            onDeleted(imageId);
        } catch {
            setDeleteError("Unable to delete the image. Please try again.");
        } finally {
            setDeletingImageId(null);
        }
    };

    return {
        deletingImageId,
        deleteError,
        deleteImageById,
        clearDeleteError,
    };
}
