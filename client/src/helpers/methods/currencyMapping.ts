import i18n from "../../localization";
import { keycloakService } from "../Auth/keycloak";
import { getInitialCountryFromLanguage } from "./getInitialCountryFromLanguage";

export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  TR: "TRY",
  DE: "EUR",
  US: "USD",
};

export function getCurrencyByCountry(countryCode: string): string {
  return (
    COUNTRY_TO_CURRENCY[
      countryCode?.toUpperCase() ?? getInitialCountryFromLanguage(i18n.language)
    ] || "USD"
  );
}

export function getCurrencySymbol(
  currencyCode?: string,
  locale?: string,
): string {
  try {
    const currency = getCurrencyByCountry(
      keycloakService.getCurrentUserCountry(),
    );
    currencyCode = currencyCode ?? currency;

    const localLang = i18n.language;
    locale = locale ?? localLang;

    const parts = new Intl.NumberFormat(localLang, {
      style: "currency",
      currency: currencyCode,
    }).formatToParts(0);

    const currencyPart = parts.find((part) => part.type === "currency");
    return currencyPart ? currencyPart.value : currencyCode;
  } catch (error) {
    return currencyCode;
  }
}
