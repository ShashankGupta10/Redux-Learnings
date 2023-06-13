import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: cartItems,
  amount: cartItems.length,
  total: 0,
  isLoading: true,
};

export const getcartItems = createAsyncThunk("cart/getCartItems", async (name, thunkAPI) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue('something went wrong')
  }

});

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

    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: {
    [getcartItems.pending]: (state) => {
      state.isLoading = true;
    },

    [getcartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getcartItems.rejected]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload

    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
