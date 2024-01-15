import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { StyleSheet, Text } from "react-native";
import theme from "../theme.js";
import Welcome from "./Welcome.jsx";
import Home from "./Home.jsx";
import CategoryItems from "./CategoryItems.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemDetail from "./ItemDetail.jsx";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "../../database/firebase.js";
import Login from "./access/Login.jsx";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  <InsideStack.Navigator initialRouteName="Welcome">
    <InsideStack.Screen name="Welcome" component={Welcome} />
    <InsideStack.Screen name="Home" component={Home} />
    <InsideStack.Screen name="ItemDetail" component={ItemDetail} />
    <InsideStack.Screen name="CategoryItems" component={CategoryItems} />
  </InsideStack.Navigator>;
}

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      console.log(user)
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 130,
  },
  heading: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginTop: 40,
    marginBottom: 60,
  },
});

export default Main;
