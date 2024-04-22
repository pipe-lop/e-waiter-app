import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import cardValidator from "card-validator";
import FormCustomInput from "../formComponents/FormCustomInput";
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from "../../utils/formatters";

const PaymentMethodForm = () => {
  const { watch } = useFormContext();
  const cardNumber = watch("cardNumber");
  const { card } = cardValidator.number(cardNumber);
  const isAmex = card?.type === "american-express";
  const cvvLength = isAmex ? 4 : 3;

  const holderNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expirationRef = useRef(null);
  const cvvRef = useRef(null);

  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (holderNameRef?.current) {
        holderNameRef.current.focus();
    }
  }, [holderNameRef]);

  async function goNext() {
    if (focusedField === null) return;

    if (focusedField === 3) {
      setFocusedField(null);
      Keyboard.dismiss();
      return;
    }

    const ref = [cardNumberRef, holderNameRef, expirationRef, cvvRef][
      focusedField + 1
    ];
    ref.current?.focus();
  }

  return (
    <View style={styles.body}>
      <FormCustomInput
        ref={holderNameRef}
        name="holderName"
        label="Nombre completo del titular"
        autoCompleteType="name"
        rules={{
          validate: {
            isValid: (value) => {
              return (
                cardValidator.cardholderName(value).isValid ||
                "El nombre no es válido"
              );
            },
          },
        }}
        autoCorrect={false}
        onSubmitEditing={goNext}
        onFocus={() => setFocusedField(0)}
      />
      <FormCustomInput
        name="cardNumber"
        ref={cardNumberRef}
        label="Número de la tarjeta"
        keyboardType="number-pad"
        autoCompleteType="cc-number"
        maxLength={19}
        validationLength={isAmex ? 18 : 19}
        rules={{
          validate: {
            isValid: (value) => {
              return (
                cardValidator.number(value).isValid ||
                "El número de la tarjeta no es válidio"
              );
            },
          },
        }}
        formatter={cardNumberFormatter}
        onFocus={() => setFocusedField(1)}
        onValid={goNext}
      />
      <View style={styles.row}>
        <View style={styles.col}>
          <FormCustomInput
            ref={expirationRef}
            name="expiration"
            label="Fecha de vencimiento"
            keyboardType="number-pad"
            autoCompleteType="cc-exp"
            maxLength={5}
            validationLength={5}
            rules={{
              validate: {
                isValid: (value) => {
                  return (
                    cardValidator.expirationDate(value).isValid ||
                    "La fecha de vencimiento no es válida"
                  );
                },
              },
            }}
            formatter={expirationDateFormatter}
            onFocus={() => setFocusedField(2)}
            onValid={goNext}
          />
        </View>
        <View style={styles.col}>
          <FormCustomInput
            ref={cvvRef}
            name="cvv"
            label="CVV"
            keyboardType="number-pad"
            autoCompleteType="cc-csc"
            maxLength={cvvLength}
            validationLength={cvvLength}
            rules={{
              validate: {
                isValid: (value) => {
                  return (
                    cardValidator.cvv(value, cvvLength).isValid ||
                    "El código de seguridad de la tarjeta no es válido"
                  );
                },
              },
            }}
            onFocus={() => setFocusedField(3)}
            onValid={goNext}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentMethodForm;

const styles = {
  body: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWarp: "warp",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  col: {
    width: "49%",
  },
};
