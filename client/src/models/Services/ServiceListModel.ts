import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";

export type ServiceListModel = {
  id: number;
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  pricing: PricingUnitsEnum;
  minPrice: number;
  maxPrice: number | null | undefined;
  status: ServiceStatusEnum;
  isActive: boolean;
  userId: string;
  createdDate: string;
  updatedDate: string | null;
};
