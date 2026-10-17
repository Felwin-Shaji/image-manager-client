
import { useCallback } from "react";
import type { ImageItem } from "../../../types/image";
import { useGalleryImages } from "./useGalleryImages";
import { useImageTitle } from "./useImageTitle";
import { useImageReplacement } from "./useImageReplacement";
import { useImageDelete } from "./useImageDelete";

export function useGallery() {
    const gallery = useGalleryImages();
    const title = useImageTitle();
    const replacement = useImageReplacement();
    const deletion = useImageDelete();

    const updateImageInGallery = useCallback(
        (updatedImage: ImageItem) => {
            gallery.setImages((current) =>
                current.map((image) =>
                    image.id === updatedImage.id ? updatedImage : image,
                ),
            );
        },
        [gallery.setImages],
    );

    const saveTitle = async (imageId: string): Promise<void> => {
        await title.saveTitle(imageId, updateImageInGallery);
    };

    const replaceImageFile = async (
        imageId: string,
        file: File,
    ): Promise<void> => {
        await replacement.replaceImageFile(
            imageId,
            file,
            updateImageInGallery,
        );
    };

    const deleteImageById = async (imageId: string): Promise<void> => {
        await deletion.deleteImageById(imageId, (deletedImageId) => {
            gallery.setImages((current) =>
                current.filter((image) => image.id !== deletedImageId),
            );
        });
    };

    return {
        images: gallery.images,
        isLoading: gallery.isLoading,
        error: gallery.error,
        retryLoading: gallery.retryLoading,
        addUploadedImages: gallery.addUploadedImages,

        editingImageId: title.editingImageId,
        editedTitle: title.editedTitle,
        setEditedTitle: title.setEditedTitle,
        startEditing: title.startEditing,
        cancelEditing: title.cancelEditing,
        saveTitle,
        titleError: title.titleError,
        isSavingTitle: title.isSavingTitle,

        replaceImageFile,
        replacementError: replacement.replacementError,
        isReplacing: replacement.isReplacing,

        deletingImageId: deletion.deletingImageId,
        deleteError: deletion.deleteError,
        deleteImageById,
        clearDeleteError: deletion.clearDeleteError,
    };
}
