import React from "react";
import Constants from "expo-constants";
import { Text, View } from "react-native";

const ProfileDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Datos Personales</Text>
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