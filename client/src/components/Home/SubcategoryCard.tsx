import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Image } from "expo-image";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { SubcategoryListModel } from "../../models/Categories/SubcategoryListModel";

export function SubcategoryCard({ item }: { item: SubcategoryListModel }) {
  var { navigate } = useAppNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate("RootTabNavigationScreen", {
          screen: "DiscoveryTab",
          params: {
            screen: "ServiceProviderListScreen",
            params: {
              subcategoryId: item.id,
              subcategoryName: item.name,
            },
          },
        })
      }
      style={styles.card}
    >
      <Image
        style={styles.image}
        contentFit="cover"
        source={{
          uri: `${process.env.EXPO_PUBLIC_FILE_SERVER_BASE_URL}/${item.imageUrl}`,
        }}
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 12,
    borderWidth: 0.2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 110,
  },
  name: {
    padding: 6,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
