import { OrderStatusEnum } from "../helpers/enums/OrderStatusEnum";
import { OrderListModel } from "../models/Services/OrderListModel";
import { PaginatedItemsViewModel } from "./../models/PaginatedItemsViewModel";
import { api } from "./api";

export const OrderService: IOrderService = {
  async getMyOrders(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedItemsViewModel<OrderListModel>> {
    try {
      var result = await api.get<PaginatedItemsViewModel<OrderListModel>>(
        `/orders/MyOrders`,
        {
          params: { page, pageSize },
        },
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async getOrderById(orderId: string): Promise<OrderListModel> {
    try {
      var result = await api.get<OrderListModel>(`/orders/GetOrderById`, {
        params: { orderId },
      });
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async GetOrdersByServiceId(
    serviceId: number,
    page: number,
    pageSize: number,
  ): Promise<PaginatedItemsViewModel<OrderListModel>> {
    try {
      var result = await api.get<PaginatedItemsViewModel<OrderListModel>>(
        `/orders/GetOrdersByServiceId`,
        {
          params: { serviceId, page, pageSize },
        },
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async updateOrderStatus(
    orderId: string,
    status: OrderStatusEnum,
  ): Promise<boolean> {
    try {
      var result = await api.put<boolean>(`/orders/updateOrderStatus`, {
        orderId: orderId,
        orderStatus: status,
      });
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
};

interface IOrderService {
  getMyOrders(
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedItemsViewModel<OrderListModel>>;
  getOrderById(orderId: string): Promise<OrderListModel>;
  GetOrdersByServiceId(
    serviceId: number,
    page: number,
    pageSize: number,
  ): Promise<PaginatedItemsViewModel<OrderListModel>>;
  updateOrderStatus(orderId: string, status: OrderStatusEnum): Promise<boolean>;
}
