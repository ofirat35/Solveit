import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import { AppUserListModel } from "../Users/AppUserListModel";
import { OrderListModel } from "./OrderListModel";

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
  providerId: string;
  provider: AppUserListModel | null;
  orders: OrderListModel[];
  totalOrdersCount: number;
  createdDate: string;
  updatedDate: string | null;
};
