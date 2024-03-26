import React from "react";
import { Image, View, Pressable} from "react-native";
import UserAvatar from "react-native-user-avatar";

const Navbar = ({navigation}) => {
  const onPress = (page) => navigation.navigate(page);
  return (
    <View style={styles.row}>
      <Pressable style={styles.col_2_of_3} onPress={() => onPress("Home")}>
        <Image style={styles.logo} source={require("../../assets/logo.png")}/>
      </Pressable>
      <Pressable style={styles.col_1_of_3} onPress={() => onPress("Profile")}>
        <UserAvatar size={30} style={styles.perfil} bgColor="#101B1C" name={"Andres"} />
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
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  },
  col_1_of_3: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '33%'
  },
  col_2_of_3: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '67%'
  }

};

export default Navbar;
