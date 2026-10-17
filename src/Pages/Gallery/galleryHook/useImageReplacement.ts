
import { useState } from "react";
import { replaceImage } from "../../../services/imageService";
import type { ImageItem } from "../../../types/image";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

interface UseImageReplacementResult {
    isReplacing: boolean;
    replacementError: string | null;
    replaceImageFile: (
        imageId: string,
        file: File,
        onUpdated: (image: ImageItem) => void,
    ) => Promise<void>;
}

export function useImageReplacement(): UseImageReplacementResult {
    const [isReplacing, setIsReplacing] = useState(false);
    const [replacementError, setReplacementError] = useState<string | null>(
        null,
    );

    const replaceImageFile = async (
        imageId: string,
        file: File,
        onUpdated: (image: ImageItem) => void,
    ): Promise<void> => {
        if (!file.type.startsWith("image/")) {
            setReplacementError("Please select a valid image file.");
            return;
        }

        if (file.size === 0) {
            setReplacementError("The selected image is empty.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
            setReplacementError("The image must not exceed 5 MB.");
            return;
        }

        setIsReplacing(true);
        setReplacementError(null);

        try {
            const updatedImage = await replaceImage(imageId, file);
            onUpdated(updatedImage);
        } catch {
            setReplacementError(
                "Unable to replace the image. Please try again.",
            );
        } finally {
            setIsReplacing(false);
        }
    };

    return {
        isReplacing,
        replacementError,
        replaceImageFile,
    };
}
