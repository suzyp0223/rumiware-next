// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   id: string;
//   name: string;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<CartItem>) {
//       const existing = state.items.find((item) => item.id === action.payload.id);
//       if (existing) {
//         existing.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//     removeFromCart(state, action: PayloadAction<string>) {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;

// 예시: cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [], // 초기엔 비어있음
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
