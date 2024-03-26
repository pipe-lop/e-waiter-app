import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileOption from "../profile/ProfileOption";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import firebase from "../../../database/firebase";
import Constants from "expo-constants";
import Navbar from "../Navbar";

const SecondaryNavbar = ({ navigation }) => {
  const [categorias, setCategorias] = useState([]);
  const getCategories = async () => {
    const cts = [];
    const q = query(collection(firebase.db, "categories"), orderBy("orden"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const { nombre } = doc.data();
      cts.push({
        id: doc.id,
        nombre,
      });
    });
    cts.push({
        id: 'Profile',
        nombre: 'Mi perfil'
    })
    cts.push({
        id: 'Salir',
        nombre: 'Salir'
    })
    console.log(cts)
    setCategorias(cts);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={categorias}
        renderItem={({ item: category }) => (
          <View style={styles.option} key={category.id}>
            <ProfileOption title={category.nombre} />
          </View>
        )}
        numColumns={1}
      />
    </View>
  );
};

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: "center",
  },
  option: {
    width: "100%",
  },
};

export default SecondaryNavbar;
