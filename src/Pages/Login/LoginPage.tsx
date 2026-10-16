
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import useLogin from "./loginHooks/useLogin";
import LoginForm from "./components/LoginForm";


export default function LoginPage() {

    const {
        formData,
        fieldErrors,
        isLoading,
        error,
        handleChange,
        handleSubmit,
    } = useLogin();

    return (
        <AuthLayout
            eyebrow="Welcome back"
            title="Sign in to Frame.ly"
            description="Pick up where you left off."
            logoHref="/login"
            footer={
                <>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-violet-300 transition hover:text-violet-200"
                    >
                        Create account
                    </Link>
                </>
            }
        >
            <LoginForm
                formData={formData}
                fieldErrors={fieldErrors}
                isLoading={isLoading}
                error={error}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    );
}
