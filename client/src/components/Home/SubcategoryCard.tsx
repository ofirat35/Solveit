import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "react-native";
import { SubcategoryListModel } from "../../models/Categories/SubcategoryListModel";

export function SubcategoryCard({ item }: { item: SubcategoryListModel }) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: `${process.env.EXPO_PUBLIC_FILE_SERVER_BASE_URL}/${item.imageUrl}`,
        }}
      />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
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
