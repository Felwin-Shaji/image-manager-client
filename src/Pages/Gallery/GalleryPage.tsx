
import { useState } from "react";
import GalleryHeader from "./components/GalleryHeader";
import ImageUploadForm from "./components/ImageUploadForm";
import ImageCard from "./components/ImageCard";
import { useGallery } from "./galleryHook/useGallery";

export default function GalleryPage() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const {
        images,
        isLoading,
        error,
        retryLoading,
        addUploadedImages,
        editingImageId,
        editedTitle,
        setEditedTitle,
        startEditing,
        cancelEditing,
        saveTitle,
        titleError,
        isSavingTitle,
        replaceImageFile,
        replacementError,
        isReplacing,
        deletingImageId,
        deleteError,
        deleteImageById,
    } = useGallery();

    const actionError =
        titleError ?? replacementError ?? deleteError;

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#09090f] p-8 text-white">
                Loading your gallery...
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#09090f] p-8 text-white">
                <p>{error}</p>

                <button
                    type="button"
                    onClick={() => void retryLoading()}
                    className="mt-4 rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-500"
                >
                    Try again
                </button>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#09090f] text-white">
            <GalleryHeader />

            <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
                <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-violet-400">
                            YOUR COLLECTION
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight">
                            My Gallery
                        </h1>

                        <p className="mt-2 text-gray-400">
                            {images.length}{" "}
                            {images.length === 1 ? "image" : "images"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsUploadOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
                    >
                        <span className="text-xl">+</span>
                        Upload images
                    </button>
                </header>

                {actionError && (
                    <p
                        role="alert"
                        className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                        {actionError}
                    </p>
                )}

                {images.length === 0 ? (
                    <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl text-violet-300">
                            ↥
                        </div>

                        <h2 className="text-xl font-semibold">
                            Your gallery is empty
                        </h2>

                        <p className="mt-2 max-w-sm text-gray-400">
                            Upload your favorite images and keep them
                            organized in one place.
                        </p>

                        <button
                            type="button"
                            onClick={() => setIsUploadOpen(true)}
                            className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium transition hover:bg-white/5"
                        >
                            Choose images
                        </button>
                    </section>
                ) : (
                    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {images.map((image) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                isEditing={editingImageId === image.id}
                                editedTitle={editedTitle}
                                isSaving={
                                    isSavingTitle ||
                                    isReplacing ||
                                    deletingImageId !== null
                                }
                                isDeleting={deletingImageId === image.id}
                                onStartEditing={startEditing}
                                onCancelEditing={cancelEditing}
                                onTitleChange={setEditedTitle}
                                onSaveTitle={saveTitle}
                                onReplaceImage={replaceImageFile}
                                onDelete={deleteImageById}
                            />
                        ))}
                    </section>
                )}
            </div>

            {isUploadOpen && (
                <ImageUploadForm
                    onClose={() => setIsUploadOpen(false)}
                    onUploaded={addUploadedImages}
                />
            )}
        </main>
    );
}
