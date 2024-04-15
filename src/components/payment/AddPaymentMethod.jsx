import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SecondaryHeader from "../navigation/SecondaryHeader";
import Constants from "expo-constants";
import CustomInput from "../formComponents/CustomInput";
import { onAuthStateChanged } from "@firebase/auth";
import firebase from "../../../database/firebase";
import { doc, getDoc } from "@firebase/firestore";

const AddPaymentMethod = ({ navigation }) => {
    const [card, setCard] = useState({
        number: "",
        expMounth: "",
        expYear: "",
        cvv: ""
    })
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
  }, []);

  return (
    <View style={styles.container}>
      <SecondaryHeader title={"Añade una tarjeta"} navigation={navigation} />
      <View style={styles.body}>
        <CustomInput
          name={"Nombre"}
          value={user.firstName + " " + user.lastName}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Número de tarjeta"}
          value={card.number}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Fecha de caducidad"}
          value={card.endDate}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
          placeholder={"MM/AA"}
        />
        <CustomInput
          name={"CVV"}
          value={card.cvv}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
        />
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
  },
};
