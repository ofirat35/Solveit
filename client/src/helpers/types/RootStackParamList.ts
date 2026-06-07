import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  RootTabNavigationScreen: NavigatorScreenParams<RootTabParamList>;

  UserProfileScreen: { userId: string };
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PasswordResetScreen: undefined;
};

export type RootTabParamList = {
  DiscoveryTab: NavigatorScreenParams<DiscoveryStackParamList>;
  ServicesTab: NavigatorScreenParams<ServicesStackParamList>;
  NotificationTab: NavigatorScreenParams<NotificationStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

export type DiscoveryStackParamList = {
  DiscoveryScreen: undefined;
  ServiceProviderListScreen: { subcategoryId: number; subcategoryName: string };
  ServiceDetailScreen: { serviceId: number };
};

export type ServicesStackParamList = {
  ServicesScreen: undefined;
  CreateServiceScreen: undefined;
  EditServiceScreen: { serviceId: number };
  OrderDetailScreen: { orderId: string };
  ServiceApplicantsScreen: { serviceId: number };
};

export type NotificationStackParamList = {
  NotificationScreen: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};
