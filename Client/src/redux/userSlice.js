import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios  from "axios";

const initialState = {
  products: [],
  allProducts: [],
  detail: [],
  display: '',
  filterCategory: false,
  filterPrice: false,    
}

export const getProducts = createAsyncThunk(
  'user/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/allProducts');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
);

export const filterCategory = createAsyncThunk(
  'user/filterCategory',
  async (filter) => {
    try {
      const response = await axios.get(`http://localhost:3001/filteredProducts?category=${filter}`);
      console.log(response.data)
      return [filter, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;      
    }
  }
)

export const filterPrice = createAsyncThunk(
  'user/filterPrice',
  async (prices) => {
    try {
      const minPrice = prices[0]
      const maxPrice = prices[1]
      console.log(maxPrice);      
      const response = await axios.get(`http://localhost:3001/filteredProducts?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      console.log(response.data);
      return [minPrice, maxPrice, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;      
    }
  }
);

//MANEJO DE ESTADOS DE REQUEST Y PAYLOADS

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los productos:', action.error);
    })
    .addCase(getProducts.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
    .addCase(filterCategory.fulfilled, (state,action) => {
      state.loading = false
      state.products = action.payload[1];
      state.filterCategory = action.payload[2];
    })
    .addCase(filterCategory.rejected, (state,action) => {
      state.loading = false
      console.error('Error obtaining filtered products ', action.error);
    })
    .addCase(filterCategory.pending, (state,action) => {
      state.loading = true
      console.log(action);
    })
    .addCase(filterPrice.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.products = action.payload[2];
      //state.filterPrice = [action.payload[0], action.payload[1]];
    })
    .addCase(filterPrice.rejected, (state,action) => {
      state.loading = false
      console.error('Error obtaining filtered products ', action.error);
    })

  }
})
//export const {  } = userSlice.actions

export default userSlice.reducer