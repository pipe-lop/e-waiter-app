import React from "react";
import { Text, TextInput, View } from "react-native";
import theme from "../../theme";

const CustomInput = React.forwardRef((props, ref) => {
  const { name, secureTextEntry, value, onChangeHandler, placeholder, editable, autoCapitalize, ...restOfProps } = props
  return (
    <View style={styles.container}>
      <Text style={styles.fontHeader}>{name}</Text>
      <TextInput 
        {...restOfProps}
        ref={ref}
        style={styles.fontInput} 
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeHandler} 
        placeholder={placeholder}
        editable={editable}
        autoCapitalize={autoCapitalize}
        />
    </View>
  );
});

const styles = {
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 5,
    fontColor: theme.colors.fontGrey,
    borderBottomWidth: 2,
    borderBottomColor: "#d6d6d6",
  },
  fontHeader: {
    fontSize: theme.fontSizes.inputHeader,
    padding: 0,
    margin: 0,
  },
  fontInput: {
    fontSize: theme.fontSizes.inputText,
    padding: 0,
    margin: 0,
  },
};

export default CustomInput;
