// import { createContext, useContext, useReducer } from "react";
// import { cartReducer } from "./CartReducer";

// const initialState = {
//   cartList: [],
// };

// const CartContext = createContext(null);

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const addToCart = (product) => {
//     dispatch({
//       type: "ADD_TO_CART",
//       payload: product,
//     });
//   };

//   const removeFromCart = (productId) => {
//     dispatch({
//       type: "REMOVE_FROM_CART",
//       payload: { id: productId },
//     });
//   };

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   // Derived state
//   const total = state.cartList.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   const value = {
//     cartList: state.cartList,
//     total,
//     addToCart,
//     removeFromCart,
//     clearCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used within CartProvider");
//   }

//   return context;
// };
