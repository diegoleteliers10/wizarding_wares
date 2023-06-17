import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios  from "axios";


const initialState = {
  products: [],
  allProducts: [],
  display: "",
  loading: false,
    
}

// export const createProd = (input) => {
//   return async (dispatch) => {
//       try {
//           const response = await axios.post("http://localhost:3001/productCreated", input)
//           return response; 
//       } catch (error) {
//           alert("Error al crear el producto", error);
//       }
//   }
// } 

export const createProd = createAsyncThunk('admin/createProduct',
  async ({input}) => {
    const response = await axios.post("http://localhost:3001/productCreated", input)
    return response; 
  }
)

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(createProd.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload);
    })
    .addCase(createProd.rejected, (state, action) => {
      state.loading = false
      console.log(action);
    })
    .addCase(createProd.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
  },
})


export const { createProduct } = adminSlice.actions

export default adminSlice.reducer