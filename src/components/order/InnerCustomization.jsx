import { Text, View } from "react-native";
import React from "react";
import theme from "../../theme";

const InnerCustomization = (props) => {
  const { estado, nombre } = props;
  const options = ["Sin", "Con", "Extra"];
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.customizationText}>{`\t\t\u2022`}</Text>
      <Text
        style={[styles.customizationText, { fontWeight: "bold" }]}
      >{` ${options[estado]} `}</Text>
      <Text style={styles.customizationText}>{nombre}</Text>
    </View>
  );
};

const styles = {
  customizationText: {
    fontSize: theme.fontSizes.h4,
  },
};

export default InnerCustomization;
