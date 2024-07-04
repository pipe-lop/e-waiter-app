import { FlatList, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import theme from "../../theme";
import Navbar from "../Navbar";
import OrderItem from "./OrderItem";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incremetQuantity,
} from "../../../redux/CartReducer";
import Toast from "react-native-root-toast";
import Fontisto from "@expo/vector-icons/Fontisto";

const myOrderHeader = () => {
  return (
    <View style={[styles.titlebox, {justifyContent: 'center'}]}>
      <Text style={styles.titletext}>Mi pedido</Text>
    </View>
  );
};
const myOrderHeaderObs = (navigation) => {
  return (
    <View style={[styles.titlebox, {justifyContent: 'space-between'}]}>
      <Text style={styles.titletext}>Mi pedido</Text>
      <Pressable style={[styles.col_stats]} onPress={() => navigation.navigate("OrderComments")}>
        <Fontisto name={"zoom"} size={26} />
        <Text>Observaciones</Text>
      </Pressable>
    </View>
  );
};

const MyOrder = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  const obs = useSelector((state)  => state.cart.customizations)
  const [totalCart, setTotalCart] = useState(0);
  const dispatch = useDispatch();
  const incremetItemQuantity = (item) => {
    dispatch(incremetQuantity(item));
  };
  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  useEffect(() => {
    if (cart.length > 0) {
      setTotalCart(
        Math.round(
          cart.reduce((acc, item) => acc + item.precio * item.quantity, 0) * 100
        ) / 100
      );
    } else {
      setTotalCart(0);
    }
  }, [cart]);
  const handleOrderComfirm = () => {
    if (totalCart > 0) {
      // navigation.navigate("SelectPaymentMethod");
      navigation.navigate("Welcome");
    } else {
      Toast.show("No ha añadido productos al pedido", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.container}>
        <View style={[theme.header]}>
          <Navbar navigation={navigation} />
        </View>
        {obs.length > 0 ? (myOrderHeaderObs(navigation)) : (myOrderHeader())}
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
                enableActions={true}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.total}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Mi pedido en curso</Text>
          </View>
          <View style={theme.redButton}>
            <Text style={theme.buttonText}>Total {totalCart}€</Text>
          </View>
        </View>
        <View style={[theme.footer]}>
          <Pressable
            style={theme.darkButton}
            onPress={() => handleOrderComfirm()}
          >
            <Text style={theme.buttonText}>Confirmar pedido</Text>
          </Pressable>
        </View>
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
    justifyContent: "space-between",
  },
  titlebox: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  titletext: {
    fontSize: theme.fontSizes.h1,
  },
  col_stats: {
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
};
