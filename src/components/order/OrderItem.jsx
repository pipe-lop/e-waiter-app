import { Pressable, Text, View } from "react-native";
import React from "react";
import theme from "../../theme";
import Entypo from "@expo/vector-icons/Entypo";

const OrderItem = ({ name, price, quantity, increment, decrement}) => {
  return (
    <Pressable>
      <View style={[styles.container]}>
        <View style={styles.name}>
          <Text>{name}</Text>
        </View>
        <View style={styles.price}>
          <Text>{price}€</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.greenButton },
            ]}
            onPress={increment}
          >
            <Entypo name="plus" size={20} color={theme.colors.white}/>
          </Pressable>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center"}}>{quantity}</Text>
          </View>
          <Pressable
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.redButton },
            ]}
            onPress={decrement}
          >
            <Entypo name="minus" size={20} color={theme.colors.white}/>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default OrderItem;

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
    width: "55%",
  },
  price: {
    width: "15%",
  },
  actions: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
  },
};
