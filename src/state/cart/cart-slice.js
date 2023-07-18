import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state, action) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addToCart: (state, action) => {
            const existingItem = state.cart.some((item) => {
                return item.item.id === action.payload.item.id;
            });
            if (!existingItem) {
                state.cart.push({
                    item: action.payload.item,
                    quantity: action.payload.quantity,
                });
            }
        },

        removeFromCart: (state, action) => {
            return {
                cart: state.cart.filter((i) => i.item.id !== action.payload),
            };
        },
    },
});

export const { toggleCart, addToCart, removeFromCart, incrementCartItem } =
    cartSlice.actions;

export const cartReducer = cartSlice.reducer;
