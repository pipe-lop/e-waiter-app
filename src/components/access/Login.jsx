import React, { useState } from "react";
import Constants from "expo-constants";
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../formComponents/CustomInput";
import AccessHeader from "./AccessHeader";
import theme from "../../theme";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebase from "../../../database/firebase";

const options = (navigation) => {
  return (
    <View style={styles.links}>
      <Pressable onPress={() => navigation.navigate("ForgottenPassword")}>
        <Text>He olvidado mi contraseña</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text>Registrarme</Text>
      </Pressable>
    </View>
  );
};

const Login = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const singIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        firebase.auth,
        user.email,
        user.password
      );
    } catch (error) {
      Alert.alert("No se ha podido iniciar sesión: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginButton = () => {
    singIn();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AccessHeader title={"Iniciar Sesión"} />
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          <CustomInput
            name={"Email"}
            onChangeHandler={(value) => handleChangeText("email", value)}
            secureTextEntry={false}
            autoCapitalize={"none"}
            placeholder={"ejemplo@ewaiter.com"}
          />
          <CustomInput
            name={"Contraseña"}
            onChangeHandler={(value) => handleChangeText("password", value)}
            secureTextEntry={true}
            autoCapitalize={"none"}
            placeholder={"***********"}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          options(navigation)
        )}
      </View>
      <View style={[theme.footer]}>
        <TouchableOpacity style={theme.darkButton} onPress={handleLoginButton}>
          <Text style={theme.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
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
  header: {},
  body: {},
  form: {
    marginTop: 50,
    marginBottom: 80,
  },
  links: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
};

export default Login;
