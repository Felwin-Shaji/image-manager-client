
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { clearCredentials } from "../store/slices/authSlice";

export default function LogoutButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate("/login", { replace: true });
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
        >
            Sign out
        </button>
    );
}
