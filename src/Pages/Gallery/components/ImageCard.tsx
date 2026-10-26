
import type {
    ChangeEvent,
    DragEvent,
    FormEvent,
} from "react";
import toast from "react-hot-toast";
import type { ImageItem } from "../../../types/image";
import DeleteImageConfirmation from "./DeleteImageConfirmation";

interface ImageCardProps {
    image: ImageItem;
    isEditing: boolean;
    editedTitle: string;
    isSaving: boolean;
    isDeleting: boolean;
    isDragging: boolean;

    onStartEditing: (image: ImageItem) => void;
    onCancelEditing: () => void;
    onTitleChange: (title: string) => void;
    onSaveTitle: (imageId: string) => Promise<void>;
    onReplaceImage: (imageId: string, file: File) => Promise<void>;
    onDelete: (imageId: string) => Promise<void>;

    onDragStart: (imageId: string) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDrop: (imageId: string) => void;
    onDragEnd: () => void;
}

const DELETE_CONFIRM_TOAST_ID = "delete-image-confirm";

export default function ImageCard({
    image,
    isEditing,
    editedTitle,
    isSaving,
    isDeleting,
    isDragging,
    onStartEditing,
    onCancelEditing,
    onTitleChange,
    onSaveTitle,
    onReplaceImage,
    onDelete,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
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

        event.target.value = "";
    };

    const handleDeleteClick = () => {
        toast.dismiss(DELETE_CONFIRM_TOAST_ID);

        toast(
            (t) => (
                <DeleteImageConfirmation
                    imageTitle={image.title}
                    toastId={t.id}
                    onConfirm={() => {
                        void onDelete(image.id);
                    }}
                />
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
    };

    const handleDragStart = () => {
        onDragStart(image.id);
    };

    const handleDragOver = (
        event: DragEvent<HTMLElement>,
    ) => {
        onDragOver(event);
    };

    const handleDrop = (
        event: DragEvent<HTMLElement>,
    ) => {
        event.preventDefault();
        onDrop(image.id);
    };

    return (
        <article
            draggable={!isSaving && !isEditing}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={onDragEnd}
            className={`overflow-hidden rounded-2xl border bg-white/[0.03] transition ${isDragging
                ? "border-violet-400 opacity-40"
                : "border-white/10 hover:border-violet-400/40"
                } ${isSaving || isEditing
                    ? "cursor-default"
                    : "cursor-grab active:cursor-grabbing"
                }`}
        >
            <img
                src={image.secureUrl}
                alt={image.title}
                loading="lazy"
                draggable={false}
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
                    onClick={handleDeleteClick}
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isDeleting ? "Deleting..." : "Delete image"}
                </button>
            </div>
        </article>
    );
}
