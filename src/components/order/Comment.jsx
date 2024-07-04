import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import theme from "../../theme";
import InnerCustomization from "./InnerCustomization";



const Comment = (props) => {
  const { product, customizations } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product}</Text>
      <FlatList
        data={customizations}
        keyboardShouldPersistTaps={"handled"}
        renderItem={({ item }) => (
          <InnerCustomization estado={item.estado} nombre={item.nombre} />
        )}
        keyExtractor={(item) => item.nombre}
      />
    </View>
  );
};

const styles = {
  container: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productName: {
    fontSize: theme.fontSizes.h3,
    fontWeight: "bold",
  },
};

export default Comment;
