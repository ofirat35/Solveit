import { GenderEnum } from "../../helpers/enums/GenderEnum";

export type AppUserUpdateModel = {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  phone: string | null;
  email: string;
  birthday: string;
};
