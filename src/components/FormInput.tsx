
import { useState, type InputHTMLAttributes } from "react";

interface FormInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    label: string;
    error?: string;
    containerClassName?: string;
}

export default function FormInput({
    label,
    error,
    type = "text",
    id,
    containerClassName = "",
    ...inputProps
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id ?? inputProps.name;
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const inputClass = [
        "h-11 w-full rounded-xl border bg-[#101019] px-3.5 text-sm text-white",
        "outline-none transition duration-200",
        "placeholder:text-slate-600",
        "focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isPassword ? "pr-16" : "",
        error
            ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/10"
            : "border-white/10",
    ].join(" ");

    return (
        <div className={`w-full ${containerClassName}`}>
            <label
                htmlFor={inputId}
                className="mb-1.5 block text-xs font-medium text-slate-300"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    {...inputProps}
                    id={inputId}
                    type={inputType}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    className={inputClass}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute inset-y-0 right-3 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>

            {error && (
                <p
                    id={`${inputId}-error`}
                    role="alert"
                    className="mt-1.5 text-xs leading-5 text-red-400"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
