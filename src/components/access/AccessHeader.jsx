import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../../theme";

const AccessHeader = ({ title, keyboardEnabled}) => {
  return (
    <View style={styles.container}>
      {!keyboardEnabled ? (
        <View style={styles.row}>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.row}>
        <Text style={keyboardEnabled ? styles.smallHeading : styles.heading}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 130,
  },
  smallLogo: {
    width: 110,
    height: 60,
  },
  heading: {
    fontFamily: "Roboto",
    fontSize: theme.fontSizes.h1,
    marginTop: 40,
  },
  smallHeading: {
    fontFamily: "Roboto",
    fontSize: theme.fontSizes.h3,
    marginTop: 5,
  },
});

export default AccessHeader;
