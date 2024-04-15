import { Text, View } from "react-native";
import React from "react";
import theme from "../../theme";
import Fontisto from '@expo/vector-icons/Fontisto'

const PaymentItem = ({ title, number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon_col}>
        <Fontisto name="visa" size={26}/>
      </View>
      <View style={styles.text_col}>
        <View>
          <Text>VISA</Text>
        </View>
        <View>
          <Text>421982XXXXXXX2541</Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentItem;

const styles = {
  container: {
    width: "100%",
    backgroundColor: theme.colors.white,
    height: 70,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  icon_col: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  text_col: {
    width: "80%",
  },
};
