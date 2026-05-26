import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import { AppUserListModel } from "../Users/AppUserListModel";

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
  user: AppUserListModel | null;
  createdDate: string;
  updatedDate: string | null;
};
