import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../../theme";

const ProfileOption = ({ title, onPressAction }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressAction}>     
      <Text style={styles.textTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#d6d6d6",
  },
  textTitle: {
    fontSize: theme.fontSizes.h4,
  },
};

export default ProfileOption;
