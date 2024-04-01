import { FlatList, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import theme from "../../theme";
import Navbar from "../Navbar";
import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incremetQuantity } from "../../../redux/CartReducer";

const MyOrder = ({ navigation }) => {
    const cart = useSelector((state) => state.cart.cart)
    const [totalCart, setTotalCart] = useState(0)
    const dispatch = useDispatch();
    const incremetItemQuantity = (item) => {
        dispatch(incremetQuantity(item))
    }
    const decrementItemQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }
  return (
    <View style={styles.container}>
      <View style={[theme.header]}>
        <Navbar navigation={navigation} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={cart}
          keyboardShouldPersistTaps={"handled"}
          renderItem={({ item }) => (
            <OrderItem
              name={item.nombre}
              price={item.precio}
              quantity={item.quantity}
              increment={() => incremetItemQuantity(item)}
              decrement={() => decrementItemQuantity(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.total}>
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
            <Text>Mis pedidos en curso</Text>
        </View>
        <View style={theme.redButton}>
            <Text style={theme.buttonText}>Total {totalCart}€</Text>
        </View>
      </View>
      <View style={[theme.footer]}>
        <Pressable style={theme.darkButton}>
          <Text style={theme.buttonText}>Confirmar pedido</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyOrder;

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  total: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "space-between"
  }
};
