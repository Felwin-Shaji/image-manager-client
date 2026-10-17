
import { useState } from "react";
import { updateImageTitle } from "../../../services/imageService";
import type { ImageItem } from "../../../types/image";

const MAX_IMAGE_TITLE_LENGTH = 100;

interface UseImageTitleResult {
    editingImageId: string | null;
    editedTitle: string;
    isSavingTitle: boolean;
    titleError: string | null;
    setEditedTitle: (title: string) => void;
    startEditing: (image: ImageItem) => void;
    cancelEditing: () => void;
    saveTitle: (
        imageId: string,
        onUpdated: (image: ImageItem) => void,
    ) => Promise<void>;
}

export function useImageTitle(): UseImageTitleResult {
    const [editingImageId, setEditingImageId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [isSavingTitle, setIsSavingTitle] = useState(false);
    const [titleError, setTitleError] = useState<string | null>(null);

    const startEditing = (image: ImageItem) => {
        setEditingImageId(image.id);
        setEditedTitle(image.title);
        setTitleError(null);
    };

    const cancelEditing = () => {
        setEditingImageId(null);
        setEditedTitle("");
        setTitleError(null);
    };

    const saveTitle = async (
        imageId: string,
        onUpdated: (image: ImageItem) => void,
    ): Promise<void> => {
        const title = editedTitle.trim();

        if (!title) {
            setTitleError("Image title cannot be empty.");
            return;
        }

        if (title.length > MAX_IMAGE_TITLE_LENGTH) {
            setTitleError(
                `Image title must not exceed ${MAX_IMAGE_TITLE_LENGTH} characters.`,
            );
            return;
        }

        setIsSavingTitle(true);
        setTitleError(null);

        try {
            const updatedImage = await updateImageTitle(imageId, title);
            onUpdated(updatedImage);
            cancelEditing();
        } catch {
            setTitleError(
                "Unable to update the image title. Please try again.",
            );
        } finally {
            setIsSavingTitle(false);
        }
    };

    return {
        editingImageId,
        editedTitle,
        isSavingTitle,
        titleError,
        setEditedTitle,
        startEditing,
        cancelEditing,
        saveTitle,
    };
}
