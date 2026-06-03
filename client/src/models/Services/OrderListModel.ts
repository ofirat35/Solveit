import { OrderStatusEnum } from "../../helpers/enums/OrderStatusEnum";
import { PricingUnitsEnum } from "../../helpers/enums/PricingUnitsEnum";
import { AppUserListModel } from "../Users/AppUserListModel";
import { ServiceListModel } from "./ServiceListModel";

export type OrderListModel = {
  id: string;
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  pricing: PricingUnitsEnum;
  minPrice: number;
  maxPrice: number | null | undefined;
  providerId: string;
  provider: AppUserListModel | null | undefined;
  serviceId: number;
  service: ServiceListModel;
  user: AppUserListModel;
  orderStatus: OrderStatusEnum;
  createdDate: string;
  updatedDate: string | null;
};
