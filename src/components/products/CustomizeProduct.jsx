import { FlatList, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import theme from "../../theme";
import Navbar from "../Navbar";
import CustomizeItem from "./CustomizeItem";
import { useDispatch } from "react-redux";
import firebase from "../../../database/firebase.js";
import { addCustomization, addToCart } from "../../../redux/CartReducer";
import { doc, getDoc } from "firebase/firestore";
import Toast from "react-native-root-toast";

const CustomizeProduct = (props) => {
  const { navigation, route } = props;
  const [original, setOriginal] = useState(null);
  const [customizations, setCustomizations] = useState(
    route.params.item.personalizaciones
  );
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    getOriginal();
  }, []);

  const getOriginal = async () => {
    try {
      const docRef = doc(firebase.db, "products", route.params.item.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOriginal(docSnap.data().personalizaciones);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();
  const handleCustomized = () => {
    const customization = {
      item: route.params.item,
      customization: customizations,
    };
    if(customized){
      console.log('añadiendo personalización >> ...')
      dispatch(addCustomization(customization))
      toastSuccess()
    }else{
      console.log('añadiendo producto >> *****')
      dispatch(addToCart(route.params.item))
      toastSuccess()
    }
  };
  const toastSuccess = () => {
    Toast.show("Se ha añadido el producto a tu pedido", {
      duration: Toast.durations.LONG,
    });
    navigation.navigate("Home");
  } 
  const increment = (nombre) => {
    const nextCustomizations = customizations.map((customization) => {
      if (customization.nombre === nombre) {
        const item = {
          nombre: customization.nombre,
          estado: customization.estado + 1,
        };
        return item;
      } else {
        return customization;
      }
    });
    setCustomizations(nextCustomizations);
    setCustomized(compareStatus(nextCustomizations));
  };
  const compareStatus = (nextCustomizations) => {
      let areEquals = original.every((element, index) => {
        return element.estado === nextCustomizations[index].estado;
      });
    return !areEquals;
  };
  const decrement = (nombre) => {
    const nextCustomizations = customizations.map((customization) => {
      if (customization.nombre === nombre) {
        const item = {
          nombre: customization.nombre,
          estado: customization.estado - 1,
        };
        return item;
      } else {
        return customization;
      }
    });
    setCustomizations(nextCustomizations);
    setCustomized(compareStatus(nextCustomizations));
  };
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
          <FlatList
            data={customizations}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <CustomizeItem
                name={item.nombre}
                index={item.estado}
                increment={() => increment(item.nombre)}
                decrement={() => decrement(item.nombre)}
              />
            )}
            keyExtractor={(item) => item.nombre}
          />
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
  squareG: {
    height: 60,
    width: 60,
    backgroundColor: theme.colors.greenButton,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  squareR: {
    height: 60,
    width: 60,
    backgroundColor: theme.colors.red,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
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
