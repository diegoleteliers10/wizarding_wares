import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  allProducts: [],
  display: "",
    
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    createProduct: (state, action) => {
        state.products = action.payload 
    },

    getProducts: (state, action) => {
        
    }
  },
})


export const { createProduct,  } = adminSlice.actions

export default adminSlice.reducer