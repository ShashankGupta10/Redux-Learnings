import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 5,
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
    removeElement: (state) => {},
  },
});

export default cartSlice.reducer;
