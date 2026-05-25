import * as yup from "yup";
import { GenderEnum } from "../../enums/GenderEnum";
export const userUpdateSchema = yup.object({
  email: yup
    .string()
    .email("Email must be at least 3 characters")
    .required("Email is required"),
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
  phone: yup.string().optional().nullable().default(null),
});

export type UserUpdateFormData = yup.InferType<typeof userUpdateSchema>;
