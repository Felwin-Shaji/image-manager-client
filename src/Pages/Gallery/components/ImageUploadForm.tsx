
import { useRef } from "react";
import type { ImageItem } from "../../../types/image";
import { useImageUpload } from "../galleryHook/useImageUpload";

interface ImageUploadFormProps {
    onClose: () => void;
    onUploaded: (images: ImageItem[]) => void;
}

export default function ImageUploadForm({
    onClose,
    onUploaded,
}: ImageUploadFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        selectedImages,
        isUploading,
        error,
        addFiles,
        updateTitle,
        removeImage,
        submitUpload,
    } = useImageUpload(onUploaded);

    const handleSubmit = async () => {
        const uploaded = await submitUpload();

        if (uploaded) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isUploading) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="upload-dialog-title"
                className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111119] p-5 text-white shadow-2xl sm:p-7"
            >
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="upload-dialog-title"
                            className="text-xl font-semibold sm:text-2xl"
                        >
                            Upload images
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Choose images and give each one a title.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isUploading}
                        aria-label="Close upload dialog"
                        className="rounded-lg px-3 py-1 text-xl text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
                    >
                        ×
                    </button>
                </header>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                        if (event.target.files) {
                            addFiles(event.target.files);
                        }

                        // Allow selecting the same file again.
                        event.target.value = "";
                    }}
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-violet-400/50 bg-violet-500/5 px-5 py-8 text-center transition hover:bg-violet-500/10 disabled:opacity-50"
                >
                    <span className="mb-3 text-3xl text-violet-300">↑</span>
                    <span className="font-medium">
                        Click to choose images
                    </span>
                    <span className="mt-2 text-sm text-gray-400">
                        Up to 10 images · Maximum 5 MB each
                    </span>
                </button>

                {error && (
                    <p
                        role="alert"
                        className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300"
                    >
                        {error}
                    </p>
                )}

                {selectedImages.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">
                                Selected images ({selectedImages.length})
                            </h3>
                        </div>

                        {selectedImages.map((image) => (
                            <article
                                key={image.id}
                                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:flex-row"
                            >
                                <img
                                    src={image.previewUrl}
                                    alt={`Preview of ${image.title}`}
                                    className="h-36 w-full rounded-lg object-cover sm:w-40"
                                />

                                <div className="min-w-0 flex-1">
                                    <label
                                        htmlFor={`title-${image.id}`}
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Image title
                                    </label>

                                    <input
                                        id={`title-${image.id}`}
                                        type="text"
                                        value={image.title}
                                        maxLength={100}
                                        onChange={(event) =>
                                            updateTitle(
                                                image.id,
                                                event.target.value,
                                            )
                                        }
                                        disabled={isUploading}
                                        placeholder="Enter an image title"
                                        className="w-full rounded-lg border border-white/10 bg-[#09090f] px-3 py-2.5 outline-none transition focus:border-violet-400"
                                    />

                                    <p className="mt-2 truncate text-xs text-gray-500">
                                        {image.file.name} ·{" "}
                                        {(image.file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeImage(image.id)}
                                    disabled={isUploading}
                                    aria-label={`Remove ${image.title}`}
                                    className="self-start rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                                >
                                    Remove
                                </button>
                            </article>
                        ))}
                    </div>
                )}

                <footer className="mt-7 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isUploading}
                        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium hover:bg-white/5 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => void handleSubmit()}
                        disabled={isUploading || selectedImages.length === 0}
                        className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isUploading
                            ? "Uploading..."
                            : `Upload ${selectedImages.length || ""} ${selectedImages.length === 1 ? "image" : "images"
                            }`}
                    </button>
                </footer>
            </section>
        </div>
    );
}
