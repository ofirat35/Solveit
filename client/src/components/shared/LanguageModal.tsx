import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomModal } from "../../components/shared/CustomModal";
import i18n from "../../localization";

const LANGUAGES: { code: string; label: string; flag: string }[] = [
  { code: "en", label: "language.english", flag: "🇬🇧" },
  { code: "tr", label: "language.turkish", flag: "🇹🇷" },
  { code: "de", label: "language.german", flag: "🇩🇪" },
];

type LanguageModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
};

export const LanguageModal = ({
  visible,
  onConfirm,
  onDismiss,
  selectedLang,
  setSelectedLang,
}: LanguageModalProps) => {
  return (
    <CustomModal
      visible={visible}
      onDismiss={onDismiss}
      title={t("settings.selectLanguage")}
      onConfirm={async () => {
        onConfirm();
        await AsyncStorage.setItem("@language", selectedLang);
        i18n.changeLanguage(selectedLang);
      }}
      onCancel={() => onDismiss()}
    >
      {LANGUAGES.map(({ code, label, flag }) => (
        <TouchableOpacity
          key={code}
          onPress={() => setSelectedLang(code)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: selectedLang === code ? "#111" : "#ccc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedLang === code && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#111",
                }}
              />
            )}
          </View>
          <Text style={{ fontSize: 15 }}>
            {flag} {t(label)}
          </Text>
        </TouchableOpacity>
      ))}
    </CustomModal>
  );
};
