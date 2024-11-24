import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (id_user) => {
  const response = await axios.get(`http://localhost:8080/cart/${id_user}`);
  return response.data;
});

export const deleteItemsCart = createAsyncThunk('cart/deleteCart',async ({ id_pro, id_user }, { getState }) => { 
    const response = await axios.delete('http://localhost:8080/cart', {
      data: { id_user, id_pro },
    });

    if (response.status) {
      return id_pro; 
    }
    throw new Error('Failed to delete item');
  }
);
export const updateNumberItems  = createAsyncThunk('cart/update',async ({ id_pro, id_user ,number}, { getState }) => { 
  const response = await axios.put('http://localhost:8080/cart', {
    id_user: id_user,
    id_pro: id_pro,
    number: number,
  });
  if (response.status) {
    return id_pro; 
  }
  throw new Error('Failed to delete item');
}
);
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: 0,
    cart: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(deleteItemsCart.fulfilled, (state, action) => {
        console.log(state.cart);
        state.cart[0].details = state.cart[0].details.filter(item => item.id_product !== action.payload);
      })


      .addCase(updateNumberItems.fulfilled, (state, action) => {
        const { id_pro, number } = action.meta.arg; // Lấy `id_pro` và `number` từ `meta.arg`
        console.log(state.cart);
              const productIndex = state.cart[0].details.findIndex(item => item.id_product === id_pro);
              if (productIndex !== -1) {
          state.cart[0].details[productIndex].number = number;  
        }
      });
      
  },
});

export default cartSlice.reducer;
