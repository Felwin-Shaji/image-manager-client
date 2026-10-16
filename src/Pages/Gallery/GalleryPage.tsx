import { useCallback, useEffect, useState } from "react";
import { getImages } from "../../services/imageService";
import type { ImageItem } from "../../types/image";
import GalleryHeader from "./components/GalleryHeader";
import ImageUploadForm from "./components/ImageUploadForm";

export default function GalleryPage() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const refreshImages = useCallback(async (uploadedImages?: ImageItem[]) => {
        if (uploadedImages) {
            setImages((current) => [...current, ...uploadedImages]);
            return;
        }

        const result = await getImages();
        setImages(result);
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await getImages();
                setImages(result);
            } catch {
                setError("Unable to load your images. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchImages();
    }, []);

    if (isLoading) {
        return <main className="p-8 text-white">Loading your gallery...</main>;
    }

    if (error) {
        return (
            <main className="p-8 text-white">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-lg bg-violet-600 px-4 py-2"
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

                {images.length === 0 ? (
                    <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl text-violet-300">
                            ↥
                        </div>

                        <h2 className="text-xl font-semibold">
                            Your gallery is empty
                        </h2>

                        <p className="mt-2 max-w-sm text-gray-400">
                            Upload your favorite images and keep them organized in one place.
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
                            <article
                                key={image.id}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet-400/40"
                            >
                                <img
                                    src={image.secureUrl}
                                    alt={image.title}
                                    loading="lazy"
                                    className="h-56 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="truncate font-medium">
                                        {image.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {image.width} × {image.height}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
            {isUploadOpen && (
                <ImageUploadForm
                    onClose={() => setIsUploadOpen(false)}
                    onUploaded={(uploadedImages) => {
                        setImages((current) => [...current, ...uploadedImages]);
                    }}
                />
            )}
        </main>
    );

}