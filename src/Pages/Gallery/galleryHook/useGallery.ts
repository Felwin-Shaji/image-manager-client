
import { useCallback, useState } from "react";
import type { ImageItem } from "../../../types/image";
import { updateImageOrder as updateImageOrderRequest } from "../../../services/imageService";
import { useGalleryImages } from "./useGalleryImages";
import { useImageTitle } from "./useImageTitle";
import { useImageReplacement } from "./useImageReplacement";
import { useImageDelete } from "./useImageDelete";

export function useGallery() {
    const gallery = useGalleryImages();
    const title = useImageTitle();
    const replacement = useImageReplacement();
    const deletion = useImageDelete();

    const [isSavingOrder, setIsSavingOrder] = useState(false);
    const [orderError, setOrderError] = useState<string | null>(null);

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

    const saveImageOrder = async (
        imageIds: string[],
    ): Promise<void> => {
        if (isSavingOrder) {
            return;
        }

        setOrderError(null);

        const imageMap = new Map(
            gallery.images.map((image) => [image.id, image]),
        );

        const hasValidOrder =
            imageIds.length === gallery.images.length &&
            new Set(imageIds).size === imageIds.length &&
            imageIds.every((id) => imageMap.has(id));

        if (!hasValidOrder) {
            setOrderError("Invalid image order. Please try again.");
            return;
        }

        const previousImages = gallery.images;

        const reorderedImages = imageIds.map((id, index) => ({
            ...imageMap.get(id)!,
            order: index,
        }));

        gallery.setImages(reorderedImages);
        setIsSavingOrder(true);

        try {
            await updateImageOrderRequest(imageIds);
        } catch {
            gallery.setImages(previousImages);
            setOrderError("Unable to save image order. Please try again.");
        } finally {
            setIsSavingOrder(false);
        }
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

        saveImageOrder,
        isSavingOrder,
        orderError,
    };
}
