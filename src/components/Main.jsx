import React from "react";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import theme from "../theme.js";
import Welcome from './Welcome.jsx';
import Home from './Home.jsx';
import CategoryItems from "./CategoryItems.jsx";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemDetail from "./ItemDetail.jsx";
import Register from "./access/Register.jsx";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
        <Stack.Screen name="CategoryItems" component={CategoryItems} />
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
