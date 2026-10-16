
export interface RegisterValidationInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterValidationInput, string>
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

export function validateRegistration(
  values: RegisterValidationInput,
): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  } else if (name.length > 80) {
    errors.name = "Name cannot exceed 80 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!INDIAN_PHONE_REGEX.test(phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!values.password) {
    errors.password = "Please create a password.";
  } else if (values.password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  } else if (values.password.length > 128) {
    errors.password = "Password cannot exceed 128 characters.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Include at least one uppercase letter.";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Include at least one lowercase letter.";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Include at least one number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
