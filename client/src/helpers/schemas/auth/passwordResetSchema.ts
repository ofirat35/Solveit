import * as yup from "yup";
const defaultBirthday = new Date();
defaultBirthday.setFullYear(defaultBirthday.getFullYear() - 18);

export const passwordResetSchema = yup.object({
  email: yup.string().email("Email is required").required("Email is required"),
});

export type PasswordResetFormData = yup.InferType<typeof passwordResetSchema>;
