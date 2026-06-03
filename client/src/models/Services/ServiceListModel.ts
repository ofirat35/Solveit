import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { ServiceStatusEnum } from "../../helpers/enums/ServiceStatusEnum";
import { AppUserListModel } from "../Users/AppUserListModel";
import { OrderListModel } from "./OrderListModel";

export type ServiceListModel = {
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
  provider: AppUserListModel | null;
  orders: OrderListModel[];
  totalOrdersCount: number;
  createdDate: string;
  updatedDate: string | null;
};
