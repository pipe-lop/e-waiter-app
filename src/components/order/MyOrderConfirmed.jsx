import { BackHandler, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import Navbar from "../Navbar";
import theme from "../../theme";

const MyOrderConfirmed = (props) => {
  const { navigation, route } = props;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    })
  );

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.container}>
        <Navbar navigation={navigation} hideMenu={true} hideProfile={true} />
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>El pedido confirmado</Text>
          </View>
          <View style={{ marginHorizontal: 40, marginVertical: 10 }}>
            <Text
              style={[{ fontSize: theme.fontSizes.h3, textAlign: "center" }]}
            >
              El pedido ha sido confirmado, en breve te indicarán que tu pedido
              está listo con el número que te indicamos a continuación
            </Text>
          </View>
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={{ fontSize: 60 }}>{route.params.orderId}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyOrderConfirmed;

const styles = {
  header: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: theme.fontSizes.h2,
  },
  body: {
    flex: 1,
  },
  container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
};
