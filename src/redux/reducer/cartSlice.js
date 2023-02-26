import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total:0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.individualPrice = existingItem.price * existingItem.quantity;
      } else {
        newItem.quantity = 1;
        newItem.individualPrice = newItem.price;
        state.items.push(newItem);
      }
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.total = calculateTotal(state.items);
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        item.individualPrice = item.price * item.quantity;
        state.total += item.price;
      }
      state.total = calculateTotal(state.items);
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.quantity -= 1;
        item.individualPrice = item.price * item.quantity;
        state.total -= item.price;
        if (item.quantity === 0) {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
      state.total = calculateTotal(state.items);
    },
    removeAllItems: (state, action) => {
      state.items = [];
      state.total = 0;
    },
  }
})
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.individualPrice, 0);
}

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, removeAllItems } = cartSlice.actions
export default cartSlice.reducer;
