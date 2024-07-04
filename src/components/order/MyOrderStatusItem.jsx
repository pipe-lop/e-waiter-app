import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import theme from "../../theme";

const MyOrderStatusItem = (props) => {
  const { status, orderId, onPress } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.col_status}>
        <Text>{status}</Text>
      </View>
      <View style={styles.col_oid}>
        <Text>Pedido {orderId}</Text>
      </View>
    </Pressable>
  );
};

export default MyOrderStatusItem;

const styles = {
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  col_status: {
    width: "30%",
  },
  col_oid: {
    width: "70%",
  },
};
