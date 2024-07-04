import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        customizations: [],
        onSite: true
    },
    reducers:{
        addToCart: (state,action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state,action) => {
            const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
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
            if(itemPresent.quantity === 1) {
                itemPresent.quantity = 0;
                const removeItem = state.cart.filter(
                    (item) => item.id !== action.payload.id
                );
                state.cart = removeItem
            } else {
                itemPresent.quantity--;
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        },
        overrideCart: (state, action) => {
            state.cart = action.payload;
        },
        addCustomization: (state, action) => {
            console.log(action)
            console.log(state)
            product = action.payload.item
            customization = {
                product: product.nombre,
                customizations: action.payload.customization
            }
            const itemPresent = state.cart.find((item) => item.id === product.id);
            if(itemPresent){
                itemPresent.quantity++;
            } else {
                state.cart.push({...product, quantity: 1});
            }
            state.customizations.push(customization)
        }
    }
})

export const { addToCart, removeFromCart, incremetQuantity, decrementQuantity, cleanCart, overrideCart, addCustomization } = CartSlice.actions;

export default CartSlice.reducer