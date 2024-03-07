import React from "react";
import { Pressable, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../theme';

const SecondaryHeader = ({navigation, title, save}) => {
  const onPress = (page) => navigation.navigate(page);
  return (
    <View style={styles.row}>
      <View style={[styles.col_icon]}>
        <Ionicons name="arrow-back" size={27} />
      </View>
      <Pressable style={[styles.col_title]} onPress={() => onPress("Home")}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
      { save ? 
        <Pressable style={styles.col_save}>
            <Text style={styles.textSave}>Guardar</Text>
        </Pressable> 
        :
        <View style={[styles.col_save]}></View>
      }
    </View>
  );
};

const styles = {
    text: {
        fontSize: theme.fontSizes.h3,
        fontWeight: "bold"
    },
    textSave: {
        fontSize: theme.fontSizes.h3,
        color: theme.colors.fontGrey
    },
    row: {
      flexDirection: "row",
      marginHorizontal: 20,
      alignItems: "center",
    },
    col_icon: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "10%",
    },
    col_title: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "60%",
    },
    col_save: {
      flexDirection: "row",
      justifyContent: "flex-end",
      width: "30%",
    },
  };

export default SecondaryHeader;
