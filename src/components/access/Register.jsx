import React, { useState } from "react";
import Constants from "expo-constants";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import CustomInput from "../formComponents/CustomInput";
import AccessHeader from "./AccessHeader";
import theme from "../../theme";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import firebase from "../../../database/firebase";

const Register = ({ navigation }) => {
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordRepeted, setPasswordRepeted] = useState("");

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleChangePassword = (value) => {
    console.log(value)
    setUser({ ...user, password: value });
    if (value === passwordRepeted) {
        setIsPasswordChecked(true);
      } else {
        setIsPasswordChecked(false);
      }
  };

  const handleRepeatPassword = (value) => {
    console.log(value)
    setPasswordRepeted(value);
    if (user.password === value) {
        setIsPasswordChecked(true);
      } else {
        setIsPasswordChecked(false);
      }
  };

  const addUser = async () => {
    if (isPasswordChecked) {
      const newUser = {
        nombre: user.firstName,
        apellidos: user.lastName,
        email: user.email,
        contrasena: user.password,
        createdDate: serverTimestamp(),
      };
      await setDoc(doc(firebase.db, "users", newUser.email), newUser);
      Alert.alert("Atención", "El usuario se ha guardado correctamente");
    } else {
      console.log(user.password + " --- " + passwordRepeted);
      Alert.alert("Atención", "Las contraseñas no coinciden");
    }
  };

  const handleRegistrationButton = () => {
    addUser();
  };

  return (
    <View style={styles.container}>
      <AccessHeader title={"Registrarme"} />

      <View style={styles.form}>
        <CustomInput
          name={"Nombre"}
          onChangeHandler={(value) => handleChangeText("firstName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Apellidos"}
          onChangeHandler={(value) => handleChangeText("lastName", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Email"}
          onChangeHandler={(value) => handleChangeText("email", value)}
          secureTextEntry={false}
        />
        <CustomInput
          name={"Contraseña"}
          onChangeHandler={(value) => handleChangePassword(value)}
          secureTextEntry={true}
        />
        <CustomInput
          name={"Repetir contraseña"}
          onChangeHandler={(value) => handleRepeatPassword(value)}
          secureTextEntry={true}
        />
      </View>
      <View style={[theme.footer]}>
        <TouchableOpacity
          style={theme.darkButton}
          onPress={handleRegistrationButton}
        >
          <Text style={theme.buttonText}>Registrarme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
  },
  form: {
    marginTop: 50,
    marginBottom: 80,
  },
};

export default Register;
