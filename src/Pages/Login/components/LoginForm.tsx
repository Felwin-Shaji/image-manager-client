
import type { FormEvent } from "react";
import type { LoginFieldErrors, LoginFormData } from "../validation/loginValidation";
import FormInput from "../../../components/FormInput";

interface LoginFormProps {
    formData: LoginFormData;
    fieldErrors: LoginFieldErrors;
    isLoading: boolean;
    error: string;
    onChange: (field: keyof LoginFormData, value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({
    formData,
    fieldErrors,
    isLoading,
    error,
    onChange,
    onSubmit,
}: LoginFormProps) {
    return (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
            <FormInput
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(event) =>
                    onChange("email", event.target.value)
                }
                autoComplete="email"
                error={fieldErrors.email}
            />

            <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(event) =>
                    onChange("password", event.target.value)
                }
                autoComplete="current-password"
                error={fieldErrors.password}
            />

            {error && (
                <p
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3 py-2.5 text-xs leading-5 text-red-300"
                >
                    {error}
                </p>
            )}

            <div className="flex justify-end">
                <a
                    href="/forgot-password"
                    className="text-xs font-medium text-violet-300 transition hover:text-violet-200"
                >
                    Forgot password?
                </a>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? "Signing in..." : "Sign in"}

                {!isLoading && (
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                )}
            </button>
        </form>
    );
}
