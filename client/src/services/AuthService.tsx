import { RegisterModel } from "../models/Auths/RegisterModel";
import { api } from "./api";

export const AuthService: IAuthService = {
  async register(registerModel: RegisterModel): Promise<boolean> {
    var result = await api.post<boolean>("/auth/register", registerModel, {
      shouldThrow: true,
    });
    return result!;
  },
};

interface IAuthService {
  register(registerModel: RegisterModel): Promise<boolean>;
}
