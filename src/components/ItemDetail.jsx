import React, { useState } from "react";
import Constants from "expo-constants";
import theme from "../theme.js";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Navbar from "./Navbar.jsx";
import bestSellers from "../data/bestSellers.js";

const ItemDetail = ({ navigation, route }) => {
  const itemId = route.params.id;
  const item = bestSellers.find(({ id }) => id === itemId);
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={[{ marginTop: Constants.statusBarHeight }, theme.container]}>
        <View style={[theme.header]}>
          <Navbar navigation={navigation} />
        </View>
        <View style={[theme.body]}>
          <View style={styles.row}>
            <Image style={styles.img} source={{ uri: item.imagen }} />
          </View>
          <View style={styles.row}>
            <Text style={styles.heading}>{item.nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subHeading}>{item.price}€</Text>
          </View>
          <View style={styles.rowSafeArea}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.description}>
                {item.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={[theme.footer]}>
          <Pressable style={theme.darkButton}>
            <Text style={theme.buttonText}>Añadir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  rowSafeArea: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 30,
  },
  img: {
    width: 360,
    height: 360,
    borderRadius: 20,
  },
  heading: {
    fontSize: theme.fontSizes.h1,
  },
  subHeading: {
    fontSize: theme.fontSizes.h2,
  },
  description: {
    fontSize: theme.fontSizes.h3,
  },
});

export default ItemDetail;
