import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";

export type ServiceUpdateModel = {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  pricing: PricingUnitsEnum;
  minPrice: number;
  maxPrice: number | null | undefined;
  status: ServiceStatusEnum;
  providerId: string;
};
