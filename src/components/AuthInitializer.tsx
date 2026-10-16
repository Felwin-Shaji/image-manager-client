
import { useEffect, useState, type ReactNode } from "react";
import { useAppDispatch } from "../store/hooks";
import { setCredentials, clearCredentials } from "../store/slices/authSlice";
import { refreshAccessToken } from "../services/authService";

interface AuthInitializerProps {
    children: ReactNode;
}

export default function AuthInitializer({
    children,
}: AuthInitializerProps) {
    const dispatch = useAppDispatch();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                const session = await refreshAccessToken();

                if (isMounted) {
                    dispatch(
                        setCredentials({
                            accessToken: session.accessToken,
                            user: session.user,
                        }),
                    );
                }
            } catch {
                if (isMounted) {
                    dispatch(clearCredentials());
                }
            } finally {
                if (isMounted) {
                    setIsInitializing(false);
                }
            }
        };

        void initializeAuth();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    if (isInitializing) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#09090f] text-white">
                Restoring your session...
            </div>
        );
    }

    return <>{children}</>;
}
