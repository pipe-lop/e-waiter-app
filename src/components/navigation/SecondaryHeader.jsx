import React from "react";
import { Pressable, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../theme';

const SecondaryHeader = ({navigation, title, save, onPress}) => {
  return (
    <View style={styles.row}>
      <Pressable style={[styles.col_icon]} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={27} />
      </Pressable>
      <View style={[styles.col_title]}>
        <Text style={styles.text}>{title}</Text>
      </View>
      { save ? 
        <Pressable style={styles.col_save} onPress={onPress}>
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
        fontSize: theme.fontSizes.h4,
        fontWeight: "bold"
    },
    textSave: {
        fontSize: theme.fontSizes.h4,
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
