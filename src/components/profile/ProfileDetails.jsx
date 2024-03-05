import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";
import {firebase} from "../../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProfileDetails = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(firebase.auth, (user) => {
          setUser(user);
        });
      }, []);
      
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Datos Personales</Text>
            <Text style={styles.text}>{user}</Text>
        </View>
    );
}

const styles = {
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        justifyContent: "center"
    },
    text: {
        textAlign: "center"
    }
}

export default ProfileDetails;