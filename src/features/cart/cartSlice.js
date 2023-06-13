import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemID;
      });
    },

    increaseItem: (state, action) => {
      const itemID = action.payload;
      state.cartItem = state.cartItems.find((item) => {
        return itemID === item.id;
      });
      state.cartItem.amount = state.cartItem.amount + 1;
    },

    decreaseItem: (state, action) => {
      const itemID = action.payload;
      state.cartItem = state.cartItems.find((item) => {
        return itemID === item.id;
      });
      if (state.cartItem.amount !== 0) {
        state.cartItem.amount = state.cartItem.amount - 1;
      }
    },

    calculateTotal: (state, action) => {
      const total = state.cartItems.forEach((item) => {
        return item.amount * item.price;
      });
      state.total = total
    },
  },
});

export const { clearCart, removeItem, increaseItem, decreaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
