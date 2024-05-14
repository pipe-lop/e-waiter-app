import React from "react";
import theme from "../theme";
import { View, Text, Pressable } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

const CategoryItem = ({ navigation, id, name, price, selected, onSelect, detail, onDetail }) => {
  return (
    <Pressable onPress={() => onSelect(id)}>
      <View style={[styles.container, selected ? { borderWidth: 1.5 } : ""]}>
        <View style={styles.name}>
          <Text>{name}</Text>
        </View>
        <View style={styles.price}>
          <Text>{price}€</Text>
        </View>
        {detail ? (
          <Pressable onPress={onDetail} style={styles.detail}>
            <Octicons name="chevron-right" size={20} color={theme.colors.black}/>
          </Pressable>
        ) : (<></>)}
        
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
    width: "70%",
  },
  price: {
    width: "20%",
  },
  detail: {
    width: "10%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    borderWidth: 1.5,
  },
};

export default CategoryItem;
