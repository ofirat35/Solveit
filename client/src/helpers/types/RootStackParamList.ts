import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  RootTabNavigationScreen: NavigatorScreenParams<RootTabParamList>;

  LoginScreen: undefined;
  RegisterScreen: undefined;
  PasswordResetScreen: undefined;
};

export type RootTabParamList = {
  DiscoveryTab: NavigatorScreenParams<DiscoveryStackParamList>;
  JobsTab: NavigatorScreenParams<JobsStackParamList>;
  NotificationTab: NavigatorScreenParams<NotificationStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

export type DiscoveryStackParamList = {
  DiscoveryScreen: undefined;
};

export type JobsStackParamList = {
  JobsScreen: undefined;
  CreateServiceScreen: undefined;
};

export type NotificationStackParamList = {
  NotificationScreen: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};
