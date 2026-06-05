import { ImagePickerAsset } from "expo-image-picker";
import { UserImageListDto } from "../models/UserImageListDto";
import { AppUserListModel } from "../models/Users/AppUserListModel";
import { AppUserUpdateModel } from "../models/Users/AppUserUpdateModel";
import { api } from "./api";

export const UserService: IUserService = {
  async getUserById(userId: string): Promise<AppUserListModel> {
    var result = await api.get<AppUserListModel>(`/users/getById/${userId}`);
    return result!;
  },
  async checkIsServiceProviderByUserId(userId: string): Promise<boolean> {
    var result = await api.get<boolean>(
      `/users/CheckIsServiceProvider/${userId}`,
    );
    return result!;
  },
  async updateUser(user: AppUserUpdateModel): Promise<any> {
    var result = await api.put<AppUserUpdateModel>(`/users/update`, user);
    return result;
  },
  async uploadImage(asset: ImagePickerAsset): Promise<UserImageListDto | null> {
    const formData = new FormData();

    formData.append("file", {
      uri: asset.uri,
      name: asset.fileName ?? "photo.jpg",
      type: asset.mimeType ?? "image/jpeg",
    } as any);

    const response = await api.post<UserImageListDto>(
      "/users/uploadImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  },
  async getUserImage(userId: string): Promise<UserImageListDto | null> {
    var response = await api.get<UserImageListDto>("/users/getUserImage", {
      params: { userId: userId },
      shouldThrow: false,
    });
    return response;
  },
  async SetIsServiceProviderAsync(isServiceProvider: boolean): Promise<any> {
    var result = await api.post(`/users/setIsServiceProvider`, {
      isServiceProvider,
    });
    return result;
  },
};

interface IUserService {
  getUserById(userId: string): Promise<AppUserListModel | null>;
  updateUser(user: AppUserUpdateModel): Promise<any>;
  uploadImage(file: ImagePickerAsset): Promise<UserImageListDto | null>;
  getUserImage(userId: string): Promise<UserImageListDto | null>;
  checkIsServiceProviderByUserId(userId: string): Promise<boolean>;
  SetIsServiceProviderAsync(isServiceProvider: boolean): Promise<any>;
}
