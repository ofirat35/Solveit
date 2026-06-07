import i18n from "../../localization";
import { keycloakService } from "../Auth/keycloak";
import { getCurrencyByCountry } from "./currencyMapping";

interface FormatCurrencyParams {
  amount: number;
  currencyCode?: string;
  locale?: string;
}

export function formatCurrency({
  amount,
  currencyCode,
  locale,
}: FormatCurrencyParams): string {
  const localLang = i18n.language;

  const currency = getCurrencyByCountry(
    keycloakService.getCurrentUserCountry(),
  );

  currencyCode = currencyCode ?? currency;
  locale = locale ?? localLang;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    return `${amount} ${currencyCode}`;
  }
}
