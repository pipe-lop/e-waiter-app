import React from "react";
import { Text, View } from "react-native";
import theme from "../../theme";

const ProfileOption = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
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
