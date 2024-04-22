import { Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../theme";

const Button = (props) => {
    const {title, style, ...restOfProps} = props
  return (
    <TouchableOpacity style={[theme.darkButton]} {...restOfProps}>
      <Text style={theme.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  container: {
    backgroundColor: "#0e20ea",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
};
