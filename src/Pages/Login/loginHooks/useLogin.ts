
import { useState, type FormEvent } from "react";
import axios from "axios";
import { validateLogin, type LoginFieldErrors, type LoginFormData } from "../validation/loginValidation";
import { useAppDispatch } from "../../../store/hooks";
import { loginUser } from "../../../services/authService";
import { setCredentials } from "../../../store/slices/authSlice";


const initialFormData: LoginFormData = {
    email: "",
    password: "",
};

export default function useLogin() {
    const dispatch = useAppDispatch();

    const [formData, setFormData] =
        useState<LoginFormData>(initialFormData);

    const [fieldErrors, setFieldErrors] =
        useState<LoginFieldErrors>({});

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        field: keyof LoginFormData,
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
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        const validationErrors = validateLogin(formData);

        setFieldErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);

        try {
            const user = await loginUser({
                email: formData.email.trim(),
                password: formData.password,
            });

            dispatch(
                setCredentials({
                    accessToken: user.accessToken,
                    user: {
                        id: user.id,
                        email: user.email,
                        phone: user.phone,
                    },
                }),
            );

            // Keep the refresh token out of localStorage for now.
            // We'll implement refresh-token handling separately.
        } catch (error: unknown) {
            if (axios.isAxiosError<{ message?: string }>(error)) {
                const message = error.response?.data?.message;

                setError(
                    typeof message === "string"
                        ? message
                        : "Login failed. Check your credentials and try again.",
                );
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        fieldErrors,
        isLoading,
        error,
        handleChange,
        handleSubmit,
    };
}
