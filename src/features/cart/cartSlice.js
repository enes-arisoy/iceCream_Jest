import { createSlice } from '@reduxjs/toolkit';

const getItemId = (productId, format) => `${productId}-${format}`;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, image, format } = action.payload;
      const id = getItemId(productId, format);
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id,
          productId,
          name,
          price,
          image,
          format,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity = Math.max(0, item.quantity + delta);
      if (item.quantity === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    clearCart: (state) => {
      state.items = [];
      state.isCartOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  openCart,
  closeCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
