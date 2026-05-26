import { GenderEnum } from "../../helpers/enums/GenderEnum";

export type AppUserListModel = {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  phone: string;
  profileImage: string;
  email: string;
  birthday: string;
  createdDate: string;
};
