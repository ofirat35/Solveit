export function getInitialCountryFromLanguage(lang: string): string {
  if (!lang) return "US";

  if (lang.includes("-")) {
    return lang.split("-")[1].toUpperCase();
  }

  const languageMap: Record<string, string> = {
    tr: "TR",
    en: "US",
    de: "DE",
  };

  return languageMap[lang.toLowerCase()] || "US";
}
