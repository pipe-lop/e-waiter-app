import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import theme from "../theme.js";
import Fontisto from "@expo/vector-icons/Fontisto";

const WhereEatOption = ({ description, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Fontisto name={icon} size={40} />
        </View>
        <Text style={styles.text}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: 166,
    height: 166,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
  },
  icon: {
    padding: 20,
  },
};

export default WhereEatOption;
