import { ServiceCreateModel } from "../models/Services/ServiceCreateModel";
import { ServiceListModel } from "../models/Services/ServiceListModel";
import { PaginatedItemsViewModel } from "./../models/PaginatedItemsViewModel";
import { api } from "./api";

export const ServiceProviderService: IServiceProviderService = {
  async createService(service: ServiceCreateModel): Promise<boolean> {
    try {
      var result = await api.post<boolean>(`/serviceProviders/create`, service);
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async getMyServices(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>> {
    try {
      var result = await api.get<PaginatedItemsViewModel<ServiceListModel>>(
        `/ServiceProviders/MyServices`,
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
  async getServicesBySubcategoryId(
    subcategoryId: number,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>> {
    try {
      var result = await api.get<PaginatedItemsViewModel<ServiceListModel>>(
        `/ServiceProviders/ServicesBySubcategoryId`,
        {
          params: { subcategoryId: subcategoryId, page, pageSize }, // This appends ?page=1&pageSize=10 to the URL
        },
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async getServiceById(serviceId: number): Promise<ServiceListModel> {
    try {
      var result = await api.get<ServiceListModel>(
        `/ServiceProviders/GetServiceById`,
        {
          params: { serviceId: serviceId },
        },
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async applyForService(serviceId: number): Promise<boolean> {
    try {
      var result = await api.post<boolean>(
        `/serviceProviders/ApplyForService`,
        { serviceId: serviceId },
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
};

interface IServiceProviderService {
  createService(service: ServiceCreateModel): Promise<boolean>;
  getMyServices(
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>>;
  getServicesBySubcategoryId(
    subcategoryId: number,
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>>;
  getServiceById(
    serviceId: number,
    pageSize?: number,
  ): Promise<ServiceListModel>;
  applyForService(serviceId: number): Promise<boolean>;
}
