import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";

export type ServiceCreateModel = {
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  pricing: PricingUnitsEnum;
  minPrice: number;
  maxPrice: number | null | undefined;
  providerId: string;
};
