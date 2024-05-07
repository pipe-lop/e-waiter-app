import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentItem from "./PaymentItem";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebase from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Contants from "expo-constants";
import SecondaryHeader from "../navigation/SecondaryHeader";
import theme from "../../theme";
import { useFocusEffect} from "@react-navigation/native";

const PaymentMethodList = ({ navigation }) => {
  const [pmethods, setPmethods] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (userId != null && pmethods.length > 0) {
        getPMethods(userId);
      }
      return () => {};
    }, [])
  );

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
        const { cardNumber, type } = doc.data();
        methods.push({
          id: doc.id,
          cardNumber,
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

  const deleteMethod = (id) => {
    try {
      Alert.alert("Atención", "Se va a eliminar el método de pago", [
        {
          text: "Cancel",
          onPress: async () => console.log("Delete Account Canceled"),
        },
        {
          text: "Ok",
          onPress: async () => {
            try {
              await deleteDoc(doc(firebase.db, "paymentMethods", id));
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <SecondaryHeader title={"Mis métodos de pago"} navigation={navigation} />
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <FlatList
            data={pmethods}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <PaymentItem
                title={getTitle(item.type)}
                icon={getType(item.type)}
                number={item.cardNumber}
                actions={true}
                onDelete={() => deleteMethod(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <Pressable
        style={styles.links}
        onPress={() => navigation.navigate("AddPaymentMethod")}
      >
        <Text>Añadir método de pago</Text>
      </Pressable>
    </View>
  );
};

export default PaymentMethodList;

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
    marginTop: 15,
    marginBottom: 50
  },
};
