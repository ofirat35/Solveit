import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SectionLabel,
  SettingRow,
} from "../../components/SettingsTab/SettingRow";
import { CustomModal } from "../../components/shared/CustomModal";
import { LanguageModal } from "../../components/shared/LanguageModal";
import { UserAvatar } from "../../components/UserAvatar";
import { keycloakService } from "../../helpers/Auth/keycloak";
import { useAuth } from "../../helpers/contexts/AuthContext";
import { useSettings } from "../../hooks/Settings/useSettings";
export function SettingsScreen() {
  const { logout } = useAuth();
  const { user } = useSettings();
  const [changeLanguageVisible, setChangeLanguageVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <UserAvatar
              user={user}
              containerStyle={styles.avatarImage}
              imageStyle={styles.avatarImage}
            ></UserAvatar>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>
              {user ? `${user?.firstName} ${user?.lastName}` : "—"}
            </Text>
            <Text style={styles.profileEmail}>{user?.email ?? "—"}</Text>
          </View>
        </View>

        <SectionLabel title={t("settings.account")} />
        <View style={styles.card}>
          <SettingRow
            icon="person-outline"
            iconBg="#e7f5ff"
            iconColor="#185FA5"
            label={t("settings.editProfile")}
            onPress={() => navigation.navigate("EditProfileScreen")}
          />
          <SettingRow
            icon="lock-closed-outline"
            iconBg="#ebfbee"
            iconColor="#27500A"
            label={t("settings.changePassword")}
            onPress={() => keycloakService.openChangePassword()}
          />
        </View>

        <SectionLabel title={t("settings.preferences")} />
        <View style={styles.card}>
          <SettingRow
            icon="language-outline"
            iconBg="#f3f0fe"
            iconColor="#3C3489"
            label={t("settings.language")}
            value={i18n.language.toUpperCase()}
            onPress={() => setChangeLanguageVisible(true)}
          />
        </View>

        <SectionLabel title={t("settings.support")} />
        <View style={styles.card}>
          <SettingRow
            icon="help-circle-outline"
            iconBg="#e7f5ff"
            iconColor="#185FA5"
            label={t("settings.helpCenter")}
            onPress={() => {}}
          />
          <SettingRow
            icon="document-text-outline"
            iconBg="#f1efe8"
            iconColor="#444441"
            label={t("settings.termsPrivacy")}
            onPress={() => {}}
          />
          <SettingRow
            icon="information-circle-outline"
            iconBg="#f1efe8"
            iconColor="#444441"
            label={t("settings.version")}
            value="1.0.0"
          />
        </View>
        <LanguageModal
          visible={changeLanguageVisible}
          onDismiss={() => setChangeLanguageVisible(false)}
          onConfirm={() => setChangeLanguageVisible(false)}
          selectedLang={selectedLang}
          setSelectedLang={(lang) => setSelectedLang(lang)}
        ></LanguageModal>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutVisible(true)}
        >
          <Ionicons name="log-out-outline" size={18} color="#A32D2D" />
          <Text style={styles.logoutText}>{t("settings.logout")}</Text>
        </TouchableOpacity>
        <CustomModal
          visible={logoutVisible}
          onDismiss={() => setLogoutVisible(false)}
          title={t("settings.confirmLogout")}
          onConfirm={() => {
            logout();
            setLogoutVisible(false);
          }}
          onCancel={() => setLogoutVisible(false)}
        >
          <Text>{t("settings.confirmLogoutMessage")}</Text>
        </CustomModal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: "#f8f9fa" },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    marginBottom: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#e7f5ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileName: { fontSize: 15, fontWeight: "600", color: "#1a1a1a" },
  profileEmail: { fontSize: 13, color: "#888", marginTop: 2 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FCEBEB",
    borderWidth: 0.5,
    borderColor: "#F7C1C1",
  },
  logoutText: { fontSize: 14, fontWeight: "600", color: "#A32D2D" },
});
