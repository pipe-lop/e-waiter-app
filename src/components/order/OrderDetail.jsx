import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../../../database/firebase";
import theme from "../../theme";
import Constants from "expo-constants";
import SecondaryHeader from "../navigation/SecondaryHeader";
import OrderItem from "./OrderItem";
import Fontisto from "@expo/vector-icons/Fontisto";
import Button from "../formComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cleanCart, overrideCart } from "../../../redux/CartReducer";
import Toast from "react-native-root-toast";

const OrderDetail = (props) => {
  const { navigation, route } = props;
  const mapStatus = new Map([
    ["created", "import"],
    ["inProgress", "clock"],
    ["done", "checkbox-active"],
  ]);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    id: "",
    orderId: 0,
    inSite: true,
    items: [],
    customizations: [],
    status: "",
    totalAmount: 0.0,
    createdDate: "",
    updatedDate: "",
  });

  useEffect(() => {
    if (route.params.id != null) {
      getOrderDetail();
    }
  }, []);

  const getOrderDetail = async () => {
    try {
      const docRef = doc(firebase.db, "orders", route.params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({
          id: docSnap.id,
          orderId: docSnap.data().orderId,
          inSite: docSnap.data().inSite,
          customizations: docSnap.data().customizations,
          items: docSnap.data().items,
          status: docSnap.data().status,
          totalAmount: docSnap.data().totalAmmount,
          createdDate: docSnap.data().createdDate,
          updatedDate: docSnap.data().updateDate,
        });
        setLoading(false);
      }
    } catch (e) {
      console.log("Error al obtener el detalle del pedido: ", e);
    }
  };

  const handleReorder = () => {
    if (cart.length > 0) {
      Alert.alert(
        "Atención",
        "Se van a sobreecribir los datos del carrito actual",
        [
          {
            text: "Cancelar",
            onPress: async () =>
              console.log("Se cancela volver a realizar un pedido antiguo"),
          },
          {
            text: "Aceptar",
            onPress: () => {
              const payload = {
                customizations: order.customizations,
                cart: order.items,
                onSite: order.inSite
              }
              dispatch(overrideCart(payload));
              Toast.show("Se ha actualizado tu pedido", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
              });
              navigation.navigate("Home");
            },
          },
        ]
      );
    } else {
      const payload = {
        customizations: order.customizations,
        cart: order.items,
        onSite: order.inSite
      }
      dispatch(overrideCart(payload));
      Toast.show("Se ha actualizado tu pedido", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      navigation.navigate("Home");
    }
  };

  return (
    <View
      style={{ backgroundColor: theme.colors.background, flex: 1, flexGrow: 1 }}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <View style={styles.loaded}>
            <View style={styles.body}>
              <SecondaryHeader
                navigation={navigation}
                title={"Resumen del pedido"}
              />
              <View style={styles.stats}>
                <View style={[styles.col_stats, styles.col_1_stats]}>
                  <Fontisto
                    name={
                      mapStatus.get(order.status) != ""
                        ? mapStatus.get(order.status)
                        : "spinner"
                    }
                    size={26}
                  />
                  <Text>{order.status}</Text>
                </View>
                <View style={[styles.col_stats, styles.col_2_stats]}>
                  <Fontisto name={"prescription"} size={26} />
                  <Text>Pedido: {order.orderId}</Text>
                </View>
                <View style={[styles.col_stats, styles.col_3_stats]}>
                  <Fontisto name={"dollar"} size={26} />
                  <Text>{order.totalAmount} €</Text>
                </View>
              </View>
              <View style={styles.obs}>
                <Pressable
                  style={[styles.col_stats]}
                  onPress={() => navigation.navigate("OrderComments", {
                    oldOrder: true,
                    obs: order.customizations
                  })}
                >
                  <Fontisto name={"zoom"} size={26} />
                  <Text>Observaciones</Text>
                </Pressable>
              </View>
              <View style={styles.items}>
                <FlatList
                  data={order.items}
                  keyboardShouldPersistTaps={"handled"}
                  renderItem={({ item }) => (
                    <OrderItem
                      name={item.nombre}
                      price={item.precio}
                      quantity={item.quantity}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
            <View style={theme.footer}>
              <Button
                title="Volver a realizar pedido"
                onPress={() => handleReorder()}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  stats: {
    marginTop: 50,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  col_stats: {
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  col_1_stats: {
    width: "35%",
  },
  col_2_stats: {
    width: "33%",
  },
  col_3_stats: {
    width: "23%",
  },
  items: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  loaded: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  obs: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  }
};
