import React, { useEffect, useState } from "react";
import { View, Pressable, Text, FlatList } from "react-native";
import theme from "../theme";
import Navbar from "./Navbar";
import Constants from "expo-constants";
import CategoryItem from "./CategoryItem";
import { collection, getDocs, query , where} from "firebase/firestore";
import firebase from "../../database/firebase";

const CategoryItems = ({ navigation, route }) => {
  const categoryId = route.params.id;
  const [products, setProducts] = useState([])
  const getProducts = async() => {
    const pds = []
    const q = query(collection(firebase.db, 'products'), where('categoria','==', categoryId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const {nombre, precio} = doc.data()
      pds.push({
        id: doc.id,
        nombre,
        precio
      })
    })
    setProducts(pds)
  }
  useEffect(() => {
    getProducts()
  }, [])
  
  const [selected, setSelected] = useState(null);
  const onSelect = (id) => {
    setSelected(id);
  };
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={[{ marginTop: Constants.statusBarHeight }, theme.container]}>
        <View style={[theme.header]}>
          <Navbar navigation={navigation} />
        </View>
        <View style={[theme.body, { paddingHorizontal: 20 }]}>
          <FlatList
            data={products}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <CategoryItem
                id={item.id}
                name={item.nombre}
                price={item.precio}
                selected={item.id === selected}
                onSelect={onSelect}
              />
            )}
            keyExtractor={(item) => item.id}
            extraData={selected}
          />
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

const styles = {
  container: {},
};

export default CategoryItems;
