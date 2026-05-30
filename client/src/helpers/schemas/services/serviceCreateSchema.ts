import * as yup from "yup";
import { PricingUnitsEnum } from "../../enums/PricingUnitsEnum";
export const serviceCreateSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  categoryId: yup.string().required("Category is required"),
  subcategoryId: yup.string().required("Subcategory is required"),
  pricing: yup
    .mixed<PricingUnitsEnum>()
    .oneOf(Object.values(PricingUnitsEnum) as PricingUnitsEnum[])
    .required("Pricing is required"),
  minPrice: yup
    .number()
    .min(0, "Minimum price must be a positive number")
    .required("Minimum price is required"),
  maxPrice: yup.number().optional().nullable().default(null),
  // .min(
  //   yup.ref("minPrice"),
  //   "Maximum price must be greater than or equal to minimum price",
  // )

  isActive: yup.boolean().required("Active status is required"),
  // userId: yup.string().uuid("Invalid user ID").required("User ID is required"),
  providerId: yup.string().required("User ID is required"),
});

export type ServiceCreateFormData = yup.InferType<typeof serviceCreateSchema>;
