
export interface LoginFormData {
    email: string;
    password: string;
}

export type LoginFieldErrors = Partial<
    Record<keyof LoginFormData, string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(
    values: LoginFormData,
): LoginFieldErrors {
    const errors: LoginFieldErrors = {};

    const email = values.email.trim();

    if (!email) {
        errors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!values.password) {
        errors.password = "Please enter your password.";
    }

    return errors;
}
