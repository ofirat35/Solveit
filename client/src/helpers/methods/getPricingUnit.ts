import { TFunction } from "i18next";
import { PricingUnitsEnum } from "../enums/PricingUnitsEnum";

export const getPricingUnit = (
  t: TFunction,
  pricing: PricingUnitsEnum,
): string => {
  switch (pricing) {
    case PricingUnitsEnum.Session:
      return t("common.perSession");
    case PricingUnitsEnum.Hour:
      return t("common.perHour");
    case PricingUnitsEnum.Day:
      return t("common.perDay");
    case PricingUnitsEnum.Fixed:
      return t("common.fixed");
    default:
      return "";
  }
};
