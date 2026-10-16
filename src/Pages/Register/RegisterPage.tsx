
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import useRegister from "./registerHook/useRegister";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
    const {
        formData,
        fieldErrors,
        isLoading,
        error,
        successMessage,
        handleChange,
        handlePhoneChange,
        handleSubmit,
    } = useRegister();

    return (
        <AuthLayout
            eyebrow="Start your collection"
            title="Create an account"
            description="A few details and your space is ready."
            logoHref="/register"
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-violet-300 transition hover:text-violet-200"
                    >
                        Sign in
                    </Link>

                    <p className="mt-4 text-[10px] leading-5 text-slate-600">
                        By continuing, you agree to our{" "}
                        <Link
                            to="/terms"
                            className="text-slate-400 hover:text-white"
                        >
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="text-slate-400 hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </>
            }
        >
            <RegisterForm
                formData={formData}
                fieldErrors={fieldErrors}
                isLoading={isLoading}
                error={error}
                successMessage={successMessage}
                onChange={handleChange}
                onPhoneChange={handlePhoneChange}
                onSubmit={handleSubmit}
            />
        </AuthLayout>
    );
}
