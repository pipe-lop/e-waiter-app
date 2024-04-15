import { Pressable, Text, View } from "react-native";
import React from "react";
import Contants from "expo-constants";
import SecondaryHeader from "../navigation/SecondaryHeader";
import PaymentItem from "./PaymentItem";
import theme from "../../theme";

const SelectPaymentMethod = ({ navigation }) => {
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
        <PaymentItem />
      </View>
      <Pressable style={styles.links} onPress={() => navigation.navigate("AddPaymentMethod")}>
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
    marginVertical: 15
  }
};
