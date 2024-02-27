import React from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import UserAvatar from "react-native-user-avatar";
import ProfileOption from "./ProfileOption";
import theme from "../../theme";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProfileHeader navigation={navigation} />
      <View style={styles.row}>
        <UserAvatar
          size={200}
          style={styles.avatar}
          bgColor="#101B1C"
          name={"Andres"}
        />
      </View>
      <View style={styles.options}>
        <ProfileOption navigation={navigation} title="Mis pedidos"/>
        <ProfileOption navigation={navigation} title="Métodos de pago"/>
        <ProfileOption navigation={navigation} title="Datos personales"/>
        <ProfileOption navigation={navigation} title="Cerrar sesión"/>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
  },
  body: {
    justifyContent: "center",
  },
  avatar: {
    width: 200,
    height: 200,
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 60
  },
  options: {
    width: "100%",
  }
};

export default Profile;
