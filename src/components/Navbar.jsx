import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, View, Pressable, Text } from "react-native";
import UserAvatar from "react-native-user-avatar";

const Navbar = ({ navigation, hideMenu, hideProfile }) => {
  const onPress = (page) => navigation.navigate(page);

  return (
    <View style={styles.row}>
      {hideMenu ? (
        <></>
      ) : (
        <Pressable
          style={[styles.col_icon]}
          onPress={() => onPress("SecondaryNavbar")}
        >
          <Ionicons name="menu" size={27} />
        </Pressable>
      )}
      <Pressable style={styles.col_2_of_3} onPress={() => onPress("Home")}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </Pressable>
      {hideProfile ? (
        <></>
      ) : (
        <Pressable style={styles.col_1_of_3} onPress={() => onPress("Profile")}>
          <UserAvatar
            size={30}
            style={styles.perfil}
            bgColor="#101B1C"
            name={"Andres"}
          />
        </Pressable>
      )}
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
    justifyContent: "space-between",
  },
  col_icon: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "16%",
  },
  col_1_of_3: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "16%",
  },
  col_2_of_3: {
    flexDirection: "row",
    justifyContent: "center",
    width: "67%",
  },
};

export default Navbar;
