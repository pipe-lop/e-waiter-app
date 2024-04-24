import { Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import theme from "../../theme";
import Fontisto from '@expo/vector-icons/Fontisto'

const PaymentItem = ({ title, number, icon, selected, onSelect }) => {
  const mapCards = new Map([
    ['maestro', 'mastercard'],
    ['mastercard','mastercard'],
    ['visa','visa'],
    ['other','credit-card']
  ]);

  const getNumber = (number) => {
    return number.replace(number.substring(5,14), '**** ****');
  }

  useEffect(() => {
  }, [])
  
  return (
    <Pressable style={[styles.container, selected ? styles.selected : ""]} onPress={onSelect}>
      <View style={styles.icon_col}>
        <Fontisto name={mapCards.get(icon)} size={26}/>
      </View>
      <View style={styles.text_col}>
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          <Text>{getNumber(number)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PaymentItem;

const styles = {
  container: {
    width: "100%",
    backgroundColor: theme.colors.white,
    height: 70,
    flexDirection: "row",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  icon_col: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  text_col: {
    width: "80%",
  },
  selected: {
    borderWidth: 2
  }
};
