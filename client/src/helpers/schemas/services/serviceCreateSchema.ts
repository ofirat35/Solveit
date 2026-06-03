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
  categoryId: yup.number().required("Category is required"),
  subcategoryId: yup.number().required("Subcategory is required"),
  pricing: yup
    .mixed<PricingUnitsEnum>()
    .oneOf(Object.values(PricingUnitsEnum) as PricingUnitsEnum[])
    .required("Pricing is required"),
  minPrice: yup
    .number()
    .min(0, "Minimum price must be a positive number")
    .required("Minimum price is required"),
  maxPrice: yup.number().optional().nullable().default(null),
  providerId: yup.string().required("User ID is required"),
});

export type ServiceCreateFormData = yup.InferType<typeof serviceCreateSchema>;
