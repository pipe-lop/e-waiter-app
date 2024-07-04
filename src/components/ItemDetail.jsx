import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import theme from "../theme.js";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Navbar from "./Navbar.jsx";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../../database/firebase.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartReducer.js";
import Toast from "react-native-root-toast";

const ItemDetail = ({ navigation, route }) => {
  const itemId = route.params.id;
  const customizable = route.params.personalizable;
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const docRef = doc(firebase.db, "products", itemId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()) {
        setItem({
          imagen: docSnap.data().imagen,
          nombre: docSnap.data().nombre,
          precio: docSnap.data().precio,
          descripcion: docSnap.data().descripcion,
          personalizaciones: docSnap.data().personalizaciones
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addItemToCart = () => {
    if (customizable) {
      goToCustomize({
        ...item,
        id: itemId,
      })
    } else {
      dispatch(
        addToCart({
          id: itemId,
          nombre: item.nombre,
          precio: item.precio,
        })
      );
      Toast.show("Se ha añadido el producto a tu pedido", {
        duration: Toast.durations.LONG,
      });
      navigation.navigate("Home");
    }
  };

  const goToCustomize = (item) => {
    navigation.navigate("CustomizeProduct",{
      item: item
    });
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View
        style={[
          { marginTop: Constants.statusBarHeight, flex: 1 },
          theme.container,
        ]}
      >
        <View style={[theme.header]}>
          <Navbar navigation={navigation} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <View style={[theme.body]}>
            <View style={styles.row}>
              <Image style={styles.img} source={{ uri: item.imagen }} />
            </View>
            <View style={styles.row}>
              <Text style={styles.heading}>{item.nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subHeading}>{item.precio}€</Text>
            </View>
            <View style={styles.rowSafeArea}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.description}>{item.descripcion}</Text>
              </ScrollView>
            </View>
          </View>
        )}
        {loading ? (
          <></>
        ) : (
          <View style={[theme.footer]}>
            <Pressable style={theme.darkButton} onPress={() => addItemToCart()}>
              <Text style={theme.buttonText}>Añadir</Text>
            </Pressable>
          </View>
        )}
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
