import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import theme from "../../theme";
import Comment from "./Comment";
import SecondaryHeader from "../navigation/SecondaryHeader";

const OrderComments = (props) => {
  const { navigation } = props;
  const obs = useSelector((state) => state.cart.customizations);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.contianer}>
        <SecondaryHeader navigation={navigation} title={"Observaciones"} />
        <View style={styles.body}>
          <FlatList
            data={obs}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <Comment
                product={item.product}
                customizations={item.customizations}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  body: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
};

export default OrderComments;
