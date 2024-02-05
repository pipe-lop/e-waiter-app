import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import theme from "../theme.js";

const WhereEatOption = ({ Description, navigation }) => {
  const onPress = () => navigation.navigate('Home');
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Aqui iria la imagen</Text>
        </View>
        <Text style={styles.text}>{Description}</Text>
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
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
  },
};

export default WhereEatOption;
