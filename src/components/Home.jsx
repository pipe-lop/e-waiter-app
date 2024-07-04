import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import HomeItem from "./HomeItem";
import Navbar from "./Navbar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import firebase from "../../database/firebase.js";
import theme from "../theme.js";
import MyOrderButton from "./order/MyOrderButton.jsx";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [loadingBest, setLoadingBest] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [destacados, setDestacados] = useState([])
  const getCategories = async () => {
    const cts = [];
    const q = query(collection(firebase.db, "categories"), orderBy("orden"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { nombre, imagen, detalle, personalizable } = doc.data();
      cts.push({
        id: doc.id,
        nombre,
        imagen,
        detalle,
        personalizable
      });
    });
    setCategorias(cts);
    setLoading(false);
  };
  const getFeatured = async () => {
    try{
      const dest = []
      const querySnapshot = await getDocs(collection(firebase.db, "featured"))
      querySnapshot.forEach((doc) => {
        const {name, image, productId, personalizable} = doc.data()
        dest.push({
          id: doc.id,
          nombre: name,
          imagen: image,
          productId,
          personalizable
        })
      })
      setDestacados(dest)
      setLoadingBest(false)
    } catch (e) {
      console.log("Error al recibir los productos destacados: ", e)
    }
  }
  useEffect(() => {
    getCategories();
    getFeatured();
  }, []);

  return (
    <View style={styles.backcont}>
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View
        style={[
          styles.row,
          { justifyContent: "flex-end", paddingHorizontal: 20 },
        ]}
      >
        <MyOrderButton onPress={() => navigation.navigate("MyOrder")} />
      </View>
      <View style={styles.row}>
        <Text style={[{ fontSize: theme.fontSizes.h3 }]}>Lo más vendido</Text>
      </View>
      {loadingBest ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        </View>
      ) : (
        <View style={styles.row}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {destacados.map((value) => (
              <HomeItem
                key={value.id}
                id={value.productId}
                url={value.imagen}
                name={value.nombre}
                navigation={navigation}
                detail={false}
                personalizable={value.personalizable}
                navigate={"ItemDetail"}
              />
            ))}
          </ScrollView>
        </View>
      )}
      <View style={styles.categories}>
        <View style={styles.row}>
          <Text style={[{ fontSize: theme.fontSizes.h3 }]}>Categorías</Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.fontGrey} />
        ) : (
          <FlatList
            style={{ flex: 1, marginHorizontal: 20 }}
            data={categorias}
            renderItem={({ item: category }) => (
              <View key={category.id}>
                <HomeItem
                  url={category.imagen}
                  id={category.id}
                  name={category.nombre}
                  navigation={navigation}
                  detail={category.detalle}
                  personalizable={category.personalizable}
                  navigate={"CategoryItems"}
                />
              </View>
            )}
            numColumns={2}
          />
        )}
      </View>
    </View>
    </View>
  );
};

const styles = {
  backcont: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: theme.colors.background
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
    flex: 1
  },
  row: {
    marginLeft: 20,
    flexDirection: "row",
  },
  categories: {
    flex: 1,
  },
  loader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Home;
