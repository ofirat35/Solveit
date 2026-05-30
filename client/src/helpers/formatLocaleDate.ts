import i18n from "i18next";

export const formatLocaleDate = (dateString?: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";

  const currentLocale = i18n.language || "en";

  return date.toLocaleDateString(currentLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
