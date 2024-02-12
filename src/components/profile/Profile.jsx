import React from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import UserAvatar from "react-native-user-avatar";

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
      <Text style={{ textAlign: "center" }}>Profile page</Text>
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
  }
};

export default Profile;
