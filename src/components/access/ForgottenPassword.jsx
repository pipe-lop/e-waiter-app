import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AccessHeader from "./AccessHeader";
import theme from "../../theme";
import CustomInput from "../formComponents/CustomInput";
import Constants from "expo-constants";

const ForgottenPassword = () => {
  const handleLoginButton = () => {
    console.log("HandleLoginButton");
  };
  const handleChangeText = (name, value) => {
    console.log("handlechangetext");
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: theme.colors.blue }]}>
        <AccessHeader title="Ha olvidado la contraseña" />
      </View>
      <View style={styles.body}>
        <Text>Introduce tu Email</Text>
        <View style={styles.form}>
          <CustomInput
            name={"Email"}
            onChangeHandler={(value) => handleChangeText("email", value)}
            secureTextEntry={false}
          />
        </View>
      </View>
      <View style={[theme.footer, { backgroundColor: theme.colors.yellow }]}>
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
  body: {
    alignItems: "center"
  },
  form: {
    marginTop: 50,
    marginBottom: 80,
    width: "80%",
    backgroundColor: theme.colors.red,
  },
};

export default ForgottenPassword;
