import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import HomeItem from "./HomeItem";
import Navbar from "./Navbar";
import bestSellers from "../data/bestSellers.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import firebase from "../../database/firebase.js";
import theme from "../theme.js";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const getCategories = async () => {
    const cts = [];
    const q = query(collection(firebase.db, "categories"), orderBy("orden"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { nombre, imagen } = doc.data();
      cts.push({
        id: doc.id,
        nombre,
        imagen,
      });
      setCategorias(cts);
      setLoading(false)
    });
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.row}>
        <Text>Lo mas vendido</Text>
      </View>
      <View style={styles.row}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSellers.map((value) => (
            <HomeItem
              key={value.id}
              id={value.id}
              url={value.imagen}
              name={value.nombre}
              navigation={navigation}
              navigate={"ItemDetail"}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.row}>
        <Text>Categorias</Text>
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
                navigate={"CategoryItems"}
              />
            </View>
          )}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
  },
  row: {
    marginLeft: 20,
    flexDirection: "row",
  },
};

export default Home;
