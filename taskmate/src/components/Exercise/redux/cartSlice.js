import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
    total: 0,
  },
  reducers: {
    add(state, action) {
      const updated=state.cartList.concat(action.payload)
      const total=state.total+action.payload.price
      return {...state,cartList:updated,total}
    },
    remove() {},
  },
});
export const { add, remove } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
