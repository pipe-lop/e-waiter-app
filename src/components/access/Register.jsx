import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import CustomInput from "../formComponents/CustomInput";
import AccessHeader from "./AccessHeader";
import theme from "../../theme";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import firebase from "../../../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const shownSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      shownSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordRepeted, setPasswordRepeted] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = firebase.auth;

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleChangePassword = (value) => {
    setUser({ ...user, password: value });
    if (value === passwordRepeted) {
      setIsPasswordChecked(true);
    } else {
      setIsPasswordChecked(false);
    }
  };

  const handleRepeatPassword = (value) => {
    setPasswordRepeted(value);
    if (user.password === value) {
      setIsPasswordChecked(true);
    } else {
      setIsPasswordChecked(false);
    }
  };

  const singUp = async () => {
    if (isPasswordChecked) {
      setLoading(true);
      try{
          const response = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
          );
          await setDoc(doc(firebase.db, "users", response.user.uid), {
            firstName: user.firstName,
            lastName: user.lastName
          });
          Alert.alert("Atención", "El usuario se ha guardado correctamente");
      }catch(error) {
        Alert.alert("Atención", "Las contraseñas no coinciden");
      }
      finally{
        setLoading(false)
      }
    }
  };

  const handleRegistrationButton = () => {
    singUp();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="´height">
        {/* <AccessHeader title={"Registrarme"} /> */}
        <AccessHeader title={"Registrarme"} keyboardEnabled={keyboardStatus} />

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
        { loading ? <ActivityIndicator size="large" color={theme.colors.fontGrey} /> : <></> }
        <View style={[theme.footer]}>
          <TouchableOpacity
            style={theme.darkButton}
            onPress={handleRegistrationButton}
          >
            <Text style={theme.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
