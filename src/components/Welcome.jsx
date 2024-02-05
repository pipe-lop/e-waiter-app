import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, Image } from "react-native";
import WhereEatOption from "./WhereEatOption.jsx";
import theme from "../theme.js";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.row, {backgroundColor: theme.colors.red}}> */}
      <View style={styles.row}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.row}>
        <Text style={styles.heading}>Bienvenido</Text>
      </View>
      <View style={styles.rowOptions}>
        <WhereEatOption Description="Restaurante" navigation={navigation}/>
        <WhereEatOption Description="Para llevar" navigation={navigation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flexGrow: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center'
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
    },
    rowOptions: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20
    },
    logo: {
      width: 240,
      height: 130,
    },
    heading: {
      fontFamily: 'Roboto',
      fontSize: 30,
      marginTop: 40,
      marginBottom: 60 
    }
  });

  export default Welcome
