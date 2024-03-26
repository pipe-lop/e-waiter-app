import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AccessHeader from "./AccessHeader";
import theme from "../../theme";
import CustomInput from "../formComponents/CustomInput";
import Constants from "expo-constants";
import {sendPasswordResetEmail } from "firebase/auth"
import firebase from "../../../database/firebase";
import validator from "validator";

const emailForm = (handler, value) => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.textBody}>
        Introduce tu dirección de correo electrónico para resetear la contraseña
      </Text>
      <View style={styles.form}>
        <CustomInput
          name={"Email"}
          onChangeHandler={handler}
          value={value}
          secureTextEntry={false}
          placeholder={"ewaiter@mail.com"}
        />
      </View>
    </View>
  );
};

const info = (navigation) => {
  return (
    <View style={{ width: "100%" }}>
      <Text style={styles.textBody}>
        Se ha enviado un mensaje a su correo electrónico para que pueda
        restablecer la contaseña
      </Text>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text>Iniciar sesión</Text>
      </Pressable>
    </View>
  );
};

const ForgottenPassword = ({ navigation }) => {
  const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("")
  const handleLoginButton = () => {
    console.log("HandleLoginButton");
    console.log(email)
    if(email != ""){
        if(validator.isEmail(email)){
        sendPasswordResetEmail(firebase.auth, email)
            .then(() => {
                setSent(true);
                setEmail("")
            })
            .catch((error) => {
                Alert.alert("Error", error.message)
            })
        }else{
            Alert.alert("Atención", "La dirección de correo electrónico introducido no tiene un formato aceptado.")
        }
    } else {
        Alert.alert("Atención", "Es requerida la información de correo electrónico.")
    }
    
  };
  const handleChangeText = (value) => {
    setEmail(value)
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <AccessHeader title="Ha olvidado la contraseña" />
      </View>
      <View style={styles.body}>
        {sent
          ? info(navigation)
          : emailForm((value) => handleChangeText(value), email)}
      </View>
      <View style={[theme.footer]}>
        {sent ? (
          <></>
        ) : (
          <TouchableOpacity
            style={theme.darkButton}
            onPress={handleLoginButton}
          >
            <Text style={theme.buttonText}>Enviar correo</Text>
          </TouchableOpacity>
        )}
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
  body: {
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: "10%",
  },
  textBody: {
    fontSize: theme.fontSizes.h4,
  },
  form: {
    marginTop: 20,
    width: "100%",
  },
};

export default ForgottenPassword;
