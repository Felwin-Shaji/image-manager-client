
import { useAppSelector } from "../../../store/hooks";
import LogoutButton from "../../../components/LogoutButton";

export default function GalleryHeader() {
    const user = useAppSelector((state) => state.auth.user);

    const avatarLetter = user?.email?.charAt(0).toUpperCase() ?? "U";

    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090f]/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
                <a
                    href="/gallery"
                    className="text-2xl font-bold tracking-tight text-white"
                >
                    Frame<span className="text-violet-500">.ly</span>
                </a>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15 font-semibold text-violet-300">
                        {avatarLetter}
                    </div>

                    <div className="hidden sm:block">
                        <p className="max-w-48 truncate text-sm font-medium text-white">
                            {user?.email ?? "Your account"}
                        </p>
                        <p className="text-xs text-gray-400">Personal gallery</p>
                    </div>

                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
