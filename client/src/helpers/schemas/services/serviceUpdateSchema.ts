import * as yup from "yup";
import { PricingUnitsEnum } from "../../enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../enums/ServiceStatusEnum";
export const serviceUpdateSchema = yup.object({
  id: yup.number().required("Service ID is required"),
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
  status: yup
    .mixed<ServiceStatusEnum>()
    .oneOf(Object.values(ServiceStatusEnum) as ServiceStatusEnum[])
    .required("Status is required"),
  providerId: yup.string().required("User ID is required"),
});

export type ServiceUpdateFormData = yup.InferType<typeof serviceUpdateSchema>;
