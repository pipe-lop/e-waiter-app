import React from "react";
import Constants from "expo-constants";
import { View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import UserAvatar from "react-native-user-avatar";
import ProfileOption from "./ProfileOption";
import firebase from "../../../database/firebase";
import { signOut } from "firebase/auth";


const singOut = async() => {
  try{
    await signOut(firebase.auth)
    .then(() => console.log('User signed out!'));
  }catch(error){
    console.log(error)
  }
}

const onPress = (page, navigation) => {
  navigation.navigate(page);
}

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
        <ProfileOption navigation={navigation} title="Métodos de pago" onPressAction={() => onPress("SelectPaymentMethod", navigation)}/>
        <ProfileOption navigation={navigation} title="Datos personales" onPressAction={() => onPress("ProfileDetails", navigation)}/>
        <ProfileOption navigation={navigation} title="Cerrar sesión" onPressAction={() => singOut()}/>
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
