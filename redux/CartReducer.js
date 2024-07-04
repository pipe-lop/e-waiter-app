import { createSlice } from "@reduxjs/toolkit";
import { getAllIndexes, getTimes, times } from "../src/utils/common";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    customizations: [],
    onSite: true,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      if (getTimes(state.customizations, action.payload) > 0) {
        let indexes = getAllIndexes(state.customizations, action.payload);
        indexes.map((i) => state.customizations.splice(i, 1));
      }
      state.cart = removeItem;
    },
    incremetQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      let times = getTimes(state.customizations, itemPresent);
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        if (times > 0) {
          let indexes = getAllIndexes(state.customizations, itemPresent);
          indexes.map((i) => state.customizations.splice(i, 1))
        }
        state.cart = removeItem;
      } else {
        if (times > 0 && times === itemPresent.quantity) {
          let indexes = getAllIndexes(state.customizations, itemPresent);
          state.customizations.splice(indexes[indexes.length - 1], 1);
        }
        itemPresent.quantity--;
      }
    },
    cleanCart: (state) => {
      state.cart = [];
      state.customizations = [];
      state.onSite = true;
    },
    overrideCart: (state, action) => {
      state.cart = action.payload.cart;
      state.customizations = action.payload.customizations;
      state.onSite = action.payload.onSite;
    },
    addCustomization: (state, action) => {
      product = action.payload.item;
      customization = {
        product: product.nombre,
        customizations: action.payload.customization,
      };
      const itemPresent = state.cart.find((item) => item.id === product.id);
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      state.customizations.push(customization);
    },
    addWhereOption: (state, action) => {
      state.onSite = action.payload
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incremetQuantity,
  decrementQuantity,
  cleanCart,
  overrideCart,
  addCustomization,
  addWhereOption
} = CartSlice.actions;

export default CartSlice.reducer;
