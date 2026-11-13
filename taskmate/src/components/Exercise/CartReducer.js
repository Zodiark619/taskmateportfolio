// export const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const existing = state.cartList.find(
//         (item) => item.id === action.payload.id,
//       );

//       const cartList = existing
//         ? state.cartList.map((item) =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item,
//           )
//         : [...state.cartList, { ...action.payload, quantity: 1 }];

//       return {
//         ...state,
//         cartList,
//       };
//     }

//     case "REMOVE_FROM_CART": {
//       return {
//         ...state,
//         cartList: state.cartList.filter(
//           (item) => item.id !== action.payload.id,
//         ),
//       };
//     }

//     case "CLEAR_CART":
//       return {
//         ...state,
//         cartList: [],
//       };

//     default:
//       return state;
//   }
// };
