import { Pressable, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import theme from "../../theme";
import Navbar from "../Navbar";

const CustomizeProduct = (props) => {
  const { navigation } = props;
  const handleCustomized = () => {
    console.log("confirmado")
  }
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.contianer}>
        <View style={[theme.header]}>
          <Navbar navigation={navigation} />
        </View>
        <View style={styles.titlebox}>
          <Text style={styles.titletext}>Personaliza tu producto</Text>
        </View>
        <View style={styles.body}>
          <Text>options</Text>
        </View>
        <View style={[theme.footer]}>
          <Pressable
            style={theme.darkButton}
            onPress={() => handleCustomized()}
          >
            <Text style={theme.buttonText}>Confirmar cambios</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = {
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  titlebox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  titletext: {
    fontSize: theme.fontSizes.h1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
};

export default CustomizeProduct;
