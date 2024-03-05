import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../../theme";

const ProfileOption = ({ navigation, title, page }) => {
  const onPress = (page) => navigation.navigate(page);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(page)}>
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
