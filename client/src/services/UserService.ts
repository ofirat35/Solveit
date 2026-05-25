import axios from "axios";
import { AppUserListModel } from "../models/Users/AppUserListModel";
import { AppUserUpdateModel } from "../models/Users/AppUserUpdateModel";
import { api } from "./api";
export const UserService: IUserService = {
  async getUserById(userId: string): Promise<AppUserListModel> {
    try {
      var result = await api.get<AppUserListModel>(`/users/getById/${userId}`);
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async checkIsServiceProviderByUserId(userId: string): Promise<boolean> {
    try {
      var result = await api.get<boolean>(
        `/users/CheckIsServiceProvider/${userId}`,
      );
      return result.data;
    } catch (error) {
      console.error("api error222:", error);
      throw error;
    }
  },
  async updateUser(user: AppUserUpdateModel): Promise<any> {
    try {
      var result = await api.put<AppUserUpdateModel>(`/users/update`, user);
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status); // 400, 401, 500 etc.
        console.log("Message:", error.message); // network-level message
        console.log("Response data:", error.response?.data); // server error body
        console.log("Headers:", error.response?.headers);
        console.log("Request URL:", error.config?.url);
      } else {
        console.log("Unknown error:", error); // non-Axios error
      }
      return null;
    }
  },
  async SetIsServiceProviderAsync(isServiceProvider: boolean): Promise<any> {
    try {
      var result = await api.post(`/users/setIsServiceProvider`, {
        isServiceProvider,
      });
      return result.data;
    } catch (error) {
      return null;
    }
  },
};

interface IUserService {
  getUserById(userId: string): Promise<AppUserListModel>;
  updateUser(user: AppUserUpdateModel): Promise<any>;
  checkIsServiceProviderByUserId(userId: string): Promise<boolean>;
  SetIsServiceProviderAsync(isServiceProvider: boolean): Promise<any>;
}
