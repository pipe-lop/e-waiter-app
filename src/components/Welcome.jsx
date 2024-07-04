import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Text, View, Image } from "react-native";
import WhereEatOption from "./WhereEatOption.jsx";
import theme from "../theme.js";
import SecondaryHeader from "./navigation/SecondaryHeader.jsx";
import { useDispatch } from "react-redux";
import { addWhereOption } from "../../redux/CartReducer.js";

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const onSite = () => {
    dispatch(addWhereOption(true))
    navigation.navigate('SelectPaymentMethod')
  };
  const takeAway = () => {
    dispatch(addWhereOption(false))
    navigation.navigate('SelectPaymentMethod')
  };
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1, flexGrow: 1}}>
      <View style={styles.container}>
        {/* <View style={styles.row, {backgroundColor: theme.colors.red}}> */}
        <SecondaryHeader navigation={navigation} title={"¿Dónde?"} />
        <View style={styles.rowOptions}>
          <WhereEatOption description="Restaurante" icon={'home'} onPress={() => onSite()}/>
          <WhereEatOption description="Para llevar" icon={'shopping-bag-1'} onPress={() => takeAway()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowOptions: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 240,
    height: 130,
  },
  heading: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginTop: 40,
    marginBottom: 60,
  },
});

export default Welcome;
