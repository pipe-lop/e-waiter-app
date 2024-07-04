import { Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import theme from "../../theme";
import Fontisto from "@expo/vector-icons/Fontisto";

const PaymentItem = ({ title, number, icon, selected, actions, onDelete }) => {
  const mapCards = new Map([
    ["maestro", "mastercard"],
    ["mastercard", "mastercard"],
    ["visa", "visa"],
    ["other", "credit-card"],
  ]);

  const getNumber = (number) => {
    return number.replace(number.substring(5, 14), "**** ****");
  };

  useEffect(() => {}, []);

  return (
    <View style={[styles.container, selected ? styles.selected : ""]}>
      <View style={styles.icon_col}>
        <Fontisto name={mapCards.get(icon)} size={26} />
      </View>
      <View style={styles.text_col}>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text>{getNumber(number)}</Text>
        </View>
      </View>
      <View style={styles.action_col}>
        {actions ? (
          <Pressable onPress={onDelete}>
            <Fontisto name={"trash"} size={22} />
          </Pressable>
        ) : (
          <></>
        )}
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
    alignItems: "center",
  },
  text_col: {
    width: "70%",
  },
  action_col: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
  },
  selected: {
    borderWidth: 2,
  },
};
