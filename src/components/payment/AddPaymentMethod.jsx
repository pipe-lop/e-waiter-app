import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SecondaryHeader from "../navigation/SecondaryHeader";
import Constants from "expo-constants";
import { onAuthStateChanged } from "@firebase/auth";
import firebase from "../../../database/firebase";
import { addDoc, collection, query, where, getDocs} from "@firebase/firestore";
import { FormProvider, useForm } from "react-hook-form";
import PaymentMethodForm from "./PaymentMethodForm";
import Button from "../formComponents/Button";
import theme from "../../theme";
import Toast from "react-native-root-toast";
import cardValidator from "card-validator";

const AddPaymentMethod = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user != null) {
        setUserId(user.uid);
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

  const saveMethod = async () => {
    try {
      const {card} = cardValidator.number(formMethods.getValues('cardNumber'))
      const createNewDoc = await checkMethod(
        formMethods.getValues("cardNumber"),
        userId
      );
      if (createNewDoc) {
        await addDoc(collection(firebase.db, "paymentMethods"), {
          owner: userId,
          holderName: formMethods.getValues("holderName"),
          cardNumber: formMethods.getValues("cardNumber"),
          expiration: formMethods.getValues("expiration"),
          cvv: formMethods.getValues("cvv"),
          type: card?.type
        })
      }
    } catch (e) {
    }
  };

  function onSubmit() {
    saveMethod().then(() => {
      formMethods.reset();
      Toast.show("Se ha añadido el método de pago", {
        duration: Toast.durations.SHORT,
      });
      navigation.goBack();
    });
  }

  const { handleSubmit, formState } = formMethods;

  const checkMethod = async (cnumber, owner) => {
    try {
      const q = query(
        collection(firebase.db, "paymentMethods"),
        where("cardNumber", "==", cnumber),
        where("owner", "==", owner)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty
    } catch (e) {
    }
  };

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
    justifyContent: "space-between",
  },
};
