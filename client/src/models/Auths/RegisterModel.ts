import { GenderEnum } from "../../helpers/enums/GenderEnum";

export type RegisterModel = {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  phone: string | null;
  email: string;
  birthday: string;
  countryCode: string;
  password: string;
};
