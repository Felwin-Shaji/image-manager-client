
import toast from "react-hot-toast";

interface DeleteImageConfirmationProps {
    imageTitle: string;
    toastId: string;
    onConfirm: () => void;
}

export default function DeleteImageConfirmation({
    imageTitle,
    toastId,
    onConfirm,
}: DeleteImageConfirmationProps) {
    return (
        <div className="w-72 text-white">
            <p className="font-semibold">
                Delete this image?
            </p>

            <p className="mt-1 text-sm text-gray-300">
                "{imageTitle}" will be permanently deleted.
            </p>

            <div className="mt-4 flex justify-end gap-2">
                <button
                    type="button"
                    onClick={() => toast.dismiss(toastId)}
                    className="rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={() => {
                        toast.dismiss(toastId);
                        onConfirm();
                    }}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium hover:bg-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
