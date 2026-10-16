
import { useState, type FormEvent } from "react";
import axios from "axios";
import { validateRegistration, type RegisterFieldErrors } from "../validation/authValidation";
import { registerUser } from "../../../services/authService";


export interface RegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const initialFormData: RegisterFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

export default function useRegister() {
    const [formData, setFormData] =
        useState<RegisterFormData>(initialFormData);

    const [fieldErrors, setFieldErrors] =
        useState<RegisterFieldErrors>({});

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (
        field: keyof RegisterFormData,
        value: string,
    ) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));

        setFieldErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        const validationErrors = validateRegistration(formData);

        setFieldErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);

        try {
            const user = await registerUser({
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                password: formData.password,
            });

            setSuccessMessage(
                `Account created for ${user.email}. You can now sign in.`,
            );

            setFormData(initialFormData);
            setFieldErrors({});
        } catch (error: unknown) {
            if (axios.isAxiosError<{ message?: string }>(error)) {
                const message = error.response?.data?.message;

                setError(
                    typeof message === "string"
                        ? message
                        : "Registration failed. Please try again.",
                );
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneChange = (value: string) => {
        if (/^\d{0,10}$/.test(value)) {
            handleChange("phone", value);
        }
    };

    return {
        formData,
        fieldErrors,
        isLoading,
        error,
        successMessage,
        handleChange,
        handlePhoneChange,
        handleSubmit,
    };
}
