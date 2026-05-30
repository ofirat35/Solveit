import { RouteProp, useRoute } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProviderCard } from "../../components/Home/ProviderCard";
import { ScreenHeader } from "../../components/shared/ScreenHeader";
import { DiscoveryStackParamList } from "../../helpers/types/RootStackParamList";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { ServiceProviderService } from "../../services/ServiceProviderService";
type ServiceProvidersRouteProp = RouteProp<
  DiscoveryStackParamList,
  "ServiceProvidersScreen"
>;

export function ServiceProvidersScreen() {
  //   const { subcategoryId, subcategoryName } = route.params;
  const { t } = useTranslation();
  const navigator = useAppNavigation();
  const route = useRoute<ServiceProvidersRouteProp>();
  const { subcategoryId, subcategoryName } = route.params;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["serviceProviders", subcategoryId],
      queryFn: ({ pageParam = 1 }) =>
        ServiceProviderService.getServicesBySubcategoryId(
          subcategoryId,
          pageParam,
          10,
        ),
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.flatMap((p) => p.data).length;
        return totalFetched < lastPage.totalEntities
          ? allPages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });

  const providers = data?.pages.flatMap((p) => p.data) ?? [];
  return (
    <View style={styles.container}>
      <ScreenHeader headerTitle={subcategoryName} />

      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t("providers.loading")}</Text>
          </View>
        ) : providers && providers.length > 0 ? (
          <FlatList
            data={providers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProviderCard
                item={item}
                onPress={() =>
                  navigator.navigate("RootTabNavigationScreen", {
                    screen: "DiscoveryTab",
                    params: {
                      screen: "ServiceDetailScreen",
                      params: {
                        serviceId: item.id,
                      },
                    },
                  })
                }
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <View style={styles.footerLoader}>
                  <ActivityIndicator color="#185FA5" />
                </View>
              ) : null
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>{t("providers.noProviders")}</Text>
            <Text style={styles.emptySubtitle}>
              {t("providers.noProvidersSubtitle")}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: { height: 12 },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 32,
  },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 14,
    color: "#aaa",
  },
});
