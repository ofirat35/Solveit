import { GenderEnum } from "../../helpers/enums/GenderEnum";

export type RegisterModel = {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  bio: string | null;
  phone: string | null;
  email: string;
  birthday: string;
  password: string;
};
