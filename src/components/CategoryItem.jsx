import React from "react";
import theme from "../theme";
import { View, Text, Pressable } from "react-native";

const CategoryItem = ({ navigation, id, name, price, selected, onSelect }) => {
  return (
    <Pressable onPress={() => onSelect(id)}>
      <View style={[styles.container, selected ? { borderWidth: 1.5 } : ""]}>
        <View style={styles.name}>
          <Text>{name}</Text>
        </View>
        <View style={styles.price}>
          <Text>{price}€</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = {
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  name: {
    width: "80%",
  },
  price: {
    width: "20%",
  },
  selected: {
    borderWidth: 1.5,
  },
};

export default CategoryItem;
