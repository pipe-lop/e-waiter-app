import React from "react";
import { Image, Pressable, View } from "react-native";
import { Icon } from "react-native-elements";

const ProfileHeader = ({navigation}) => {
  const onPress = (page) => navigation.navigate(page);
  return (
    <View style={styles.row}>
      <View style={styles.col_1_of_3}>
        <Icon name="menu" type="ionicon" />
      </View>
      <Pressable style={styles.col_2_of_3} onPress={() => onPress("Home")}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = {
  logo: {
    width: 130,
    height: 70,
  },
  perfil: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
  },
  col_1_of_3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "33%",
  },
  col_2_of_3: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "67%",
  },
};

export default ProfileHeader;
