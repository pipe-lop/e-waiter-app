import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Contants from "expo-constants";
import SecondaryHeader from "../navigation/SecondaryHeader";
import theme from "../../theme";
import { collection, getDocs, query, where } from "firebase/firestore";
import firebase from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FlatList } from "react-native";
import PressablePaymentItem from "./PressablePaymentItem";
import { useIsFocused } from "@react-navigation/native";

const SelectPaymentMethod = ({ navigation }) => {
  const [pmethods, setPmethods] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null)

  const isFocused = useIsFocused();

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        setUserId(user.uid);
      }
    });
    if(userId != null && pmethods.length == 0){
      getPMethods(userId)
    }
    if(userId != null && isFocused){
      getPMethods(userId)
    }
  }, [userId, pmethods, isFocused]);

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
    setSelected(id)
  }

  const handlePay = () => {
    console.log("pagando...");
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
