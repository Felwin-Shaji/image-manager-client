
import type { FormEvent } from "react";
import FormInput from "../../../components/FormInput";
import type { RegisterFormData } from "../registerHook/useRegister";
import type { RegisterFieldErrors } from "../validation/authValidation";

interface RegisterFormProps {
    formData: RegisterFormData;
    fieldErrors: RegisterFieldErrors;
    isLoading: boolean;
    error: string;
    successMessage: string;
    onChange: (field: keyof RegisterFormData, value: string) => void;
    onPhoneChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function RegisterForm({
    formData,
    fieldErrors,
    isLoading,
    error,
    successMessage,
    onChange,
    onPhoneChange,
    onSubmit,
}: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit} noValidate className="space-y-3.5">
            <FormInput
                label="Full name"
                name="name"
                placeholder="How should we call you?"
                value={formData.name}
                onChange={(event) => onChange("name", event.target.value)}
                autoComplete="name"
                error={fieldErrors.name}
            />

            <FormInput
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(event) => onChange("email", event.target.value)}
                autoComplete="email"
                error={fieldErrors.email}
            />

            <div>
                <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                    Phone number
                </label>

                <div className="flex h-11 overflow-hidden rounded-xl border border-white/10 bg-[#101019] transition focus-within:border-violet-400/70 focus-within:ring-2 focus-within:ring-violet-400/10">
                    <span className="flex items-center border-r border-white/10 px-3 text-xs font-semibold text-slate-400">
                        +91
                    </span>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(event) => onPhoneChange(event.target.value)}
                        autoComplete="tel-national"
                        maxLength={10}
                        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-600"
                    />
                </div>

                {fieldErrors.phone && (
                    <p role="alert" className="mt-1.5 text-xs leading-5 text-red-400">
                        {fieldErrors.phone}
                    </p>
                )}
            </div>

            <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(event) => onChange("password", event.target.value)}
                autoComplete="new-password"
                error={fieldErrors.password}
            />

            <FormInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                value={formData.confirmPassword}
                onChange={(event) => onChange("confirmPassword", event.target.value)}
                autoComplete="new-password"
                error={fieldErrors.confirmPassword}
            />

            {error && (
                <p
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3 py-2.5 text-xs leading-5 text-red-300"
                >
                    {error}
                </p>
            )}

            {successMessage && (
                <p
                    role="status"
                    className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2.5 text-xs leading-5 text-emerald-300"
                >
                    {successMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading ? "Creating your account..." : "Create account"}

                {!isLoading && (
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                )}
            </button>
        </form>
    );
}
