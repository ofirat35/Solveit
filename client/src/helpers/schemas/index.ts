import * as yup from "yup";
import { GenderEnum } from "../enums/GenderEnum";
const defaultBirthday = new Date();
defaultBirthday.setFullYear(defaultBirthday.getFullYear() - 18);

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email must be at least 3 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("Email must be at least 3 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  firstName: yup
    .string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  gender: yup
    .mixed<GenderEnum>()
    .oneOf(Object.values(GenderEnum) as GenderEnum[])
    .required("Gender is required"),
  birthday: yup
    .date()
    .required("Birth date is required")
    .test("min-age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const birthDate = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
      );
      const minAge = new Date();
      minAge.setFullYear(minAge.getFullYear() - 18);
      return birthDate <= minAge;
    }),
  bio: yup.string().optional().nullable().default(null),
  phone: yup.string().optional().nullable().default(null),
});

export const passwordResetSchema = yup.object({
  email: yup.string().email("Email is required").required("Email is required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type PasswordResetFormData = yup.InferType<typeof passwordResetSchema>;
