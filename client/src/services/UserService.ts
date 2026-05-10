import { AppUserListModel } from "../models/Users/AppUserListModel";
import { AppUserUpdateModel } from "./../models/Users/AppUserUpdateModel";
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
  async updateUser(user: AppUserUpdateModel): Promise<any> {
    try {
      var result = await api.put<AppUserUpdateModel>(`/users/update`, user);
      return result.data;
    } catch (error) {
      console.error("api error:", error);
      return null;
    }
  },
};

interface IUserService {
  getUserById(userId: string): Promise<AppUserListModel>;
  updateUser(user: AppUserUpdateModel): Promise<any>;
}
