import { Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import React, { useState } from "react";
import SecondaryHeader from "../navigation/SecondaryHeader";
import CustomInput from "../formComponents/CustomInput";
import theme from "../../theme";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import firebase from "../../../database/firebase";

const ChangePassword = ({ navigation }) => {
  const emptyPasswords = {
    oldPassword: "",
    newPassword: "",
    passwordRepeated: "",
  };
  const [passwords, setPasswords] = useState(emptyPasswords);
  const handleChangeText = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
  };
  const handleRegistrationButton = async () => {
    if (
      passwords.newPassword != "" &&
      passwords.newPassword == passwords.passwordRepeated
    ) {
      const credential = EmailAuthProvider.credential(
        firebase.auth.currentUser.email,
        passwords.oldPassword
      );
      try {
        await reauthenticateWithCredential(
          firebase.auth.currentUser,
          credential
        ).then(() => {
          updatePassword(firebase.auth.currentUser, passwords.newPassword)
            .then(() => {
              console.log("Password Changed");
              setPasswords(emptyPasswords);
            })
            .catch((error) => console.log(error));
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("contraseñas no coinciden...");
    }
  };
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 , flexGrow: 1}}>
      <View style={styles.container}>
        <SecondaryHeader
          title={"Datos personales"}
          save={false}
          navigation={navigation}
        />
        <View>
          <CustomInput
            placeholder={"Contraseña actual"}
            secureTextEntry={true}
            onChangeHandler={(value) => handleChangeText("oldPassword", value)}
            value={passwords.oldPassword}
            autoCapitalize={"none"}
          />
          <CustomInput
            placeholder={"Contraseña nueva"}
            secureTextEntry={true}
            onChangeHandler={(value) => handleChangeText("newPassword", value)}
            value={passwords.newPassword}
            autoCapitalize={"none"}
          />
          <CustomInput
            placeholder={"Confirmar contraseña nueva"}
            secureTextEntry={true}
            onChangeHandler={(value) =>
              handleChangeText("passwordRepeated", value)
            }
            value={passwords.passwordRepeated}
            autoCapitalize={"none"}
          />
        </View>
        <View style={[theme.footer]}>
          <TouchableOpacity
            style={theme.darkButton}
            onPress={handleRegistrationButton}
          >
            <Text style={theme.buttonText}>Actualizar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "space-between",
  },
};

export default ChangePassword;
