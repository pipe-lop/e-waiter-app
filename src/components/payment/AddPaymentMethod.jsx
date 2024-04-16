import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SecondaryHeader from "../navigation/SecondaryHeader";
import Constants from "expo-constants";
import CustomInput from "../formComponents/CustomInput";
import { onAuthStateChanged } from "@firebase/auth";
import firebase from "../../../database/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import FormCustomInput from "../formComponents/FormCustomInput";
import theme from "../../theme";

const AddPaymentMethod = ({ navigation }) => {
  const [card, setCard] = useState({
    number: "",
    expMounth: "",
    expYear: "",
    cvv: "",
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    id: "",
  });
  const getUserExtended = async (userId) => {
    const docRef = doc(firebase.db, "users", userId);
    const data = await getDoc(docRef)
      .then((data) => {
        return data.data();
      })
      .catch((error) => console.log("getUserExtended", error));
    return data;
  };
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        getUserExtended(user.uid)
          .then((data) => {
            setUser({
              ...user,
              id: user.uid,
              firstName: data.firstName,
              lastName: data.lastName,
            });
          })
          .catch((error) => {
            console.log("useEffect", error);
          });
      }
    });
  });
  const formMethods = useForm({
    defaultValues: {
      holderName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
  });
  return (
    <View style={styles.container}>
      <SecondaryHeader title={"Añade una tarjeta"} navigation={navigation} />
      <View style={styles.body}>
        <FormProvider {...formMethods}>
          <FormCustomInput name="holderName" label="Nombre completo" />
          <FormCustomInput name="cardNumber" label="Número de la tarjeta" />
          <View style={styles.row}>
            <View style={styles.col}>
              <FormCustomInput name="expiration" label="Fecha de caducidad" placeholder="MM/AA"/>
            </View>
            <View style={styles.col}>
              <FormCustomInput name="cvv" label="CVV" />
            </View>
          </View>
        </FormProvider>
        <Text>AddPaymentMethod</Text>
      </View>
    </View>
  );
};

export default AddPaymentMethod;

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  body: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWarp: "warp",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  col: {
    width: "49%",
  },
};
