import { ServiceCreateModel } from "../models/Services/ServiceCreateModel";
import { ServiceListModel } from "../models/Services/ServiceListModel";
import { ServiceUpdateModel } from "../models/Services/ServiceUpdateModel";
import { PaginatedItemsViewModel } from "./../models/PaginatedItemsViewModel";
import { api } from "./api";

export const ServiceProviderService: IServiceProviderService = {
  async createService(service: ServiceCreateModel): Promise<boolean> {
    var result = await api.post<boolean>(`/serviceProviders/create`, service);
    return result!;
  },
  async updateService(service: ServiceUpdateModel): Promise<boolean> {
    var result = await api.put<boolean>(`/serviceProviders/update`, service);
    return result!;
  },
  async getUserServices(
    userId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>> {
    var result = await api.get<PaginatedItemsViewModel<ServiceListModel>>(
      `/ServiceProviders/GetUserServices`,
      {
        params: { userId, page, pageSize },
      },
    );
    return result!;
  },
  async getServicesBySubcategoryId(
    subcategoryId: number,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedItemsViewModel<ServiceListModel>> {
    var result = await api.get<PaginatedItemsViewModel<ServiceListModel>>(
      `/ServiceProviders/ServicesBySubcategoryId`,
      {
        params: { subcategoryId: subcategoryId, page, pageSize }, // This appends ?page=1&pageSize=10 to the URL
      },
    );
    return result!;
  },
  async getServiceById(serviceId: number): Promise<ServiceListModel> {
    var result = await api.get<ServiceListModel>(
      `/ServiceProviders/GetServiceById`,
      {
        params: { serviceId: serviceId },
      },
    );
    return result!;
  },
  async applyForService(serviceId: number): Promise<boolean> {
    var result = await api.post<boolean>(`/serviceProviders/ApplyForService`, {
      serviceId: serviceId,
    });
    return result!;
  },
};

interface IServiceProviderService {
  createService(service: ServiceCreateModel): Promise<boolean>;
  updateService(service: ServiceUpdateModel): Promise<boolean>;
  getUserServices(
    userId: string,
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
