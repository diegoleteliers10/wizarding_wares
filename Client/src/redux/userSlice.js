import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  allProducts: [],
  detail: [],
  display: '',
  filterCategory: false,
  filterPrice: [],
};

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
});

export const filterCategory = createAsyncThunk(
  'user/filterCategory', 
  async (filter, { getState }) => {
  try {
    const state = getState();
    //console.log(state.user.filterPrice);
    if(state.user.filterPrice.length){
      const minPrice = state.user.filterPrice[0];
      const maxPrice = state.user.filterPrice[1];
      const response = await axios.get(`http://localhost:3001/filteredProducts?category=${filter}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
      return [filter, response.data];
    }
    const response = await axios.get(`http://localhost:3001/filteredProducts?category=${filter}`);
    //console.log(response.data)
    return [filter, response.data];
  } catch (error) {
    console.error('Error obtaining filtered products', error);
    throw error;
  }
});

export const filterPrice = createAsyncThunk(
  'user/filterPrice',
   async (prices, { getState }) => {
  try {
    const minPrice = prices[0];
    const maxPrice = prices[1];
    const state = getState();
    if(state.user.filterCategory){
      const category = state.user.filterCategory;
      //console.log(category)
      const response = await axios.get(`http://localhost:3001/filteredProducts?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    //console.log(response.data);
    return [minPrice, maxPrice, response.data];
    }        
    const response = await axios.get(`http://localhost:3001/filteredProducts?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    //console.log(response.data);
    return [minPrice, maxPrice, response.data];
  } catch (error) {
    console.error('Error obtaining filtered products', error);
    throw error;
  }
});

export const sortByNameAscending = createAction('user/sortByNameAscending');
export const sortByNameDescending = createAction('user/sortByNameDescending');
export const sortByPriceAscending = createAction('user/sortByPriceAscending');
export const sortByPriceDescending = createAction('user/sortByPriceDescending');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filterCategory = false;
        state.filterPrice = [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        console.error('Error al obtener los productos:', action.error);
      })
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
        console.log(action);
      })
      .addCase(filterCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload[1];
        state.filterCategory = action.payload[0];
      })
      .addCase(filterCategory.rejected, (state, action) => {
        state.loading = false;
        console.error('Error obtaining filtered products ', action.error);
      })
      .addCase(filterCategory.pending, (state, action) => {
        state.loading = true;
        console.log(action);
      })
      .addCase(filterPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload[2];
        state.filterPrice = [action.payload[0], action.payload[1]];
      })
      .addCase(filterPrice.rejected, (state, action) => {
        state.loading = false;
        console.error('Error obtaining filtered products ', action.error);
      })
      .addCase(sortByNameAscending, (state) => {
        state.products.sort((a, b) => a.name.localeCompare(b.name));
      })
      .addCase(sortByNameDescending, (state) => {
        state.products.sort((a, b) => b.name.localeCompare(a.name));
      })
      .addCase(sortByPriceAscending, (state) => {
        state.products.sort((a, b) => b.price-a.price);
      })
      .addCase(sortByPriceDescending, (state) => {
        state.products.sort((a, b) => a.price-b.price);
      });
  },
});

export default userSlice.reducer;