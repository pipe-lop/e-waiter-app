import { Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import theme from "../../theme";

const CustomizeItem = (props) => {
  const { name, index, increment, decrement } = props;
  const [incrementable, setIncrementable] = useState(true)
  const [decrementable, setDecrementable] = useState(true)

  useEffect(() => {
    if(index === 0){
        setDecrementable(false)
    } else if( index === 1) {
        setDecrementable(true)
        setIncrementable(true)
    } else{
        setIncrementable(false)
    }
  }, [index])
  
  const options = ["Sin", "Con", "Extra"];

  return (
    <View style={[styles.container]}>
      <View style={styles.name}>
        <Text>{name}</Text>
      </View>
      <View style={styles.actions}>
        {incrementable ? (
          <Pressable
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.greenButton },
            ]}
            onPress={increment}
          >
            <Entypo name="plus" size={20} color={theme.colors.white} />
          </Pressable>
        ) : (
            <View
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.fontGrey },
            ]}
          >
            <Entypo name="plus" size={20} color={theme.colors.white} />
          </View>
        )}
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>{options[index]}</Text>
          </View>
        {decrementable ? (
          <Pressable
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.redButton },
            ]}
            onPress={decrement}
          >
            <Entypo name="minus" size={20} color={theme.colors.white} />
          </Pressable>
        ) : (
            <View
            style={[
              theme.quantityButton,
              { backgroundColor: theme.colors.fontGrey },
            ]}
          >
            <Entypo name="minus" size={20} color={theme.colors.white} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  name: {
    width: "70%",
  },
  actions: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default CustomizeItem;
