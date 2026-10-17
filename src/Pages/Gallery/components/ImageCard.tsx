
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import type { ImageItem } from "../../../types/image";

interface ImageCardProps {
    image: ImageItem;
    isEditing: boolean;
    editedTitle: string;
    isSaving: boolean;
    onStartEditing: (image: ImageItem) => void;
    onCancelEditing: () => void;
    onTitleChange: (title: string) => void;
    onSaveTitle: (imageId: string) => Promise<void>;
    onReplaceImage: (imageId: string, file: File) => Promise<void>;
    onDelete: (imageId: string) => Promise<void>;
    isDeleting: boolean;
}

const DELETE_CONFIRM_TOAST_ID = "delete-image-confirm";
export default function ImageCard({
    image,
    isEditing,
    editedTitle,
    isSaving,
    onStartEditing,
    onCancelEditing,
    onTitleChange,
    onSaveTitle,
    onReplaceImage,
    isDeleting,
    onDelete,
}: ImageCardProps) {
    const handleTitleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        void onSaveTitle(image.id);
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            void onReplaceImage(image.id, file);
        }

        // Allow the user to select the same file again.
        event.target.value = "";
    };

    return (
        <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet-400/40">
            <img
                src={image.secureUrl}
                alt={image.title}
                loading="lazy"
                className="h-56 w-full object-cover"
            />

            <div className="p-4">
                {isEditing ? (
                    <form
                        onSubmit={handleTitleSubmit}
                        className="space-y-3"
                    >
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(event) =>
                                onTitleChange(event.target.value)
                            }
                            maxLength={100}
                            required
                            aria-label="Image title"
                            disabled={isSaving}
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-violet-500 disabled:opacity-50"
                        />

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="rounded-lg bg-violet-600 px-3 py-2 text-sm transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>

                            <button
                                type="button"
                                onClick={onCancelEditing}
                                disabled={isSaving}
                                className="rounded-lg border border-white/15 px-3 py-2 text-sm transition hover:bg-white/5 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex items-center justify-between gap-2">
                        <h2
                            className="truncate font-medium"
                            title={image.title}
                        >
                            {image.title}
                        </h2>

                        <button
                            type="button"
                            onClick={() => onStartEditing(image)}
                            disabled={isSaving}
                            className="shrink-0 text-sm text-violet-300 transition hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Edit title
                        </button>
                    </div>
                )}

                <p className="mt-2 text-sm text-gray-400">
                    {image.width} × {image.height}
                </p>

                <label
                    className={`mt-3 inline-flex items-center rounded-lg border border-white/15 px-3 py-2 text-sm transition ${isSaving
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-white/5"
                        }`}
                >
                    {isSaving ? "Updating..." : "Replace image"}

                    <input
                        type="file"
                        accept="image/*"
                        disabled={isSaving}
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                </label>



                <button
                    type="button"
                    disabled={isSaving || isDeleting}
                    onClick={() => {
                        toast.dismiss(DELETE_CONFIRM_TOAST_ID);

                        toast(
                            (t) => (
                                <div className="w-72 text-white">
                                    <p className="font-semibold">
                                        Delete this image?
                                    </p>

                                    <p className="mt-1 text-sm text-gray-300">
                                        "{image.title}" will be permanently deleted.
                                    </p>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => toast.dismiss(t.id)}
                                            className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                toast.dismiss(t.id);
                                                void onDelete(image.id);
                                            }}
                                            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ),
                            {
                                id: DELETE_CONFIRM_TOAST_ID,
                                duration: Infinity,
                                position: "top-center",
                                style: {
                                    background: "#18181b",
                                    border: "1px solid #3f3f46",
                                    padding: "16px",
                                    marginTop: "40vh",
                                },
                            },
                        );
                    }}
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isDeleting ? "Deleting..." : "Delete image"}
                </button>


            </div>
        </article>
    );
}
