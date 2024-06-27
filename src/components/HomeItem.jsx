import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";

const HomeItem = ({id, name, url, navigation, navigate, detail}) => {
  const onPress = () => navigation.navigate(navigate, {
    id: id,
    detail: detail,
    title: name
  });
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image}>
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: 165,
    height: 190,
    backgroundColor: theme.colors.white,
    marginVertical: 10,
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: "hidden",
  },
  image: {
    height: 160,
  },
  text: {
    textAlign: 'center'
  }
};

export default HomeItem;
