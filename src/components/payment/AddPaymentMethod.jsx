import { Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SecondaryHeader from "../navigation/SecondaryHeader";
import Constants from "expo-constants";
import { onAuthStateChanged } from "@firebase/auth";
import firebase from "../../../database/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodForm from "./PaymentMethodForm";
import Button from "../formComponents/Button";
import { Alert } from "react-native";
import theme from "../../theme";
import { cardNumber } from "card-validator/dist/card-number";
import Toast from "react-native-root-toast";

const AddPaymentMethod = ({ navigation }) => {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        setUserId(user.uid)
      }
    });
  }, []);

  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      holderName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
  });

  const saveMethod = async () =>{
    try{
      await addDoc(collection(firebase.db, "paymentMethods"), {
        userId: userId,
        holderName: formMethods.getValues('holderName'),
        cardNumber: formMethods.getValues('cardNumber'),
        expiration: formMethods.getValues('expiration'),
        cvv: formMethods.getValues('cvv')
      })
    } catch (e) {
      Alert.alert('Error', e.getMessage())
    }
  }

  function onSubmit() {
    saveMethod().then(() => {
      formMethods.reset()
      Toast.show('Se ha añadido el método de pago',{
        duration: Toast.durations.SHORT,
      })
      navigation.goBack()
    })
  }

  const { handleSubmit, formState } = formMethods;

  return (
    <View style={styles.container}>
      <SecondaryHeader title={"Añade una tarjeta"} navigation={navigation} />
      <View style={styles.body}>
        <FormProvider {...formMethods}>
          <View>
            <PaymentMethodForm />
          </View>
          {formState.isValid && (
            <View style={theme.footer}>
              <Button
                title="Añadir método de pago"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          )}
        </FormProvider>
      </View>
    </View>
  );
};

export default AddPaymentMethod;

const styles = {
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between'
  }
};
