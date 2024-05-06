import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import SecondaryHeader from "../navigation/SecondaryHeader";
import theme from "../../theme";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  where,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FlatList } from "react-native";
import PressablePaymentItem from "./PressablePaymentItem";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../../../redux/CartReducer";

const SelectPaymentMethod = ({ navigation }) => {
  const [pmethods, setPmethods] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const cart = useSelector((state) => state.cart.cart);
  const [totalCart, setTotalCart] = useState(0);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (userId != null && pmethods.length > 0) {
        getPMethods(userId);
      }
      return () => {};
    }, [])
  );

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

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        setUserId(user.uid);
      }
    });
    if (userId != null && pmethods.length == 0) {
      getPMethods(userId);
    }
  }, [userId, pmethods]);

  const getPMethods = async (id) => {
    try {
      const q = query(
        collection(firebase.db, "paymentMethods"),
        where("owner", "==", id)
      );
      const querySnapshot = await getDocs(q);
      const methods = [];
      querySnapshot.forEach((doc) => {
        const { cardNumber, expiration, cvv, type } = doc.data();
        methods.push({
          id: doc.id,
          cardNumber,
          expiration,
          cvv,
          type,
        });
      });
      if (methods.length > 0) {
        setLoading(false);
        setPmethods(methods);
      }
    } catch (e) {
      console.log("Error pmethods: ", e);
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case "maestro":
        return "Maestro";
      case "mastercard":
        return "Mastercard";
      case "visa":
        return "VISA";
      default:
        return "Tarjeta de credito";
    }
  };

  const getType = (type) => {
    switch (type) {
      case "maestro":
        return "maestro";
      case "mastercard":
        return "mastercard";
      case "visa":
        return "visa";
      default:
        return "other";
    }
  };

  const onSelectHandler = (id) => {
    setSelected(id);
  };

  const handlePay = () => {
    saveOrder();
  };

  const saveOrder = async () => {
    try {
      await runTransaction(firebase.db, async (transaction) => {
        const statsRef = doc(firebase.db, "orders", "--stats--");
        const oStats = await transaction.get(statsRef);
        let orderId = 0;
        if (!oStats.exists()) {
          await transaction.set(statsRef, { orders: 1 });
        } else {
          await transaction.update(statsRef, { orders: increment(1) });
          orderId = oStats.data().orders;
        }
        await transaction.set(doc(collection(firebase.db, "orders")), {
          orderId: orderId,
          totalAmmount: totalCart,
          inSite: true,
          client: userId,
          status: "created",
          createdDate: serverTimestamp(),
          updateDate: serverTimestamp(),
          items: cart,
        });
        dispatch(cleanCart())
        navigation.navigate('MyOrderConfirmed', {
          orderId: orderId,
        })
      });
    } catch (e) {
      console.log("Error en saveOrder: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader
        title={"Seleccione método de pago"}
        navigation={navigation}
      />
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <FlatList
            data={pmethods}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <PressablePaymentItem
                title={getTitle(item.type)}
                icon={getType(item.type)}
                number={item.cardNumber}
                selected={selected === item.id}
                onSelect={() => onSelectHandler(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={selected}
          />
        )}
      </View>
      <Pressable
        style={styles.links}
        onPress={() => navigation.navigate("AddPaymentMethod")}
      >
        <Text>Añadir método de pago</Text>
      </Pressable>
      <View style={[theme.footer]}>
        <Pressable style={theme.darkButton} onPress={() => handlePay()}>
          <Text style={theme.buttonText}>Pagar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectPaymentMethod;

const styles = {
  container: {
    marginTop: Contants.statusBarHeight,
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  links: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
};
