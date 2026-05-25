import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";

export type ServiceCreateModel = {
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  pricing: PricingUnitsEnum;
  minPrice: number;
  maxPrice: number | null | undefined;
  isActive: boolean;
  userId: string;
};
