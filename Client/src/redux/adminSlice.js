import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios  from "axios";


const initialState = {
  products: [],
  allProducts: [],
  display: "productList",
  loading: false,
  edit: [],  
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
  async (input) => {
    const response = await axios.post("http://localhost:3001/productCreated", input)
    return response; 
  }
)

export const getProducts = createAsyncThunk(
  'admin/getProducts',
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

export const displayCreate = createAsyncThunk(
  'admin/displayCreate',
  async (_, thunkAPI) => {
    return 'createProduct';
  }
)
export const displayProductList = createAsyncThunk(
  'admin/displayProductList',
  async (_, thunkAPI) => {
    return 'productList';
  }
)

export const displayEditProduct = createAsyncThunk(
  'admin/displayEditProduct',
  async (_, thunkAPI) => {
    return 'editProduct';
  }
)

export const setEditState = createAsyncThunk('admin/setEditState',
async (input) => {
  return input; 
}
)

export const editProduct = createAsyncThunk('admin/editProduct',
async (input) => {
  const response = await axios.put(`http://localhost:3001/editProduct/${input.id}`, {name: input.name, price: input.price, description: input.description, stock: input.stock, categoryId:input.categoryId})
  return response; 
}
)

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/deleteProduct/${productId}`);
      return response.data;
    } catch (error) { 
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
);

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
    .addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false
      //alert('La actualización se realizó con éxito!')
      console.log(action.payload);
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.loading = false
      console.log(action);
    })
    .addCase(editProduct.pending, (state, action) => {
      state.loading = true
      console.log(action);
    })
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
    })
    .addCase(displayCreate.fulfilled, (state, action) => {
      state.display = action.payload;
    })
    .addCase(displayCreate.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(displayProductList.fulfilled, (state, action) => {
      state.display = action.payload;
    })
    .addCase(displayEditProduct.fulfilled, (state, action) => {
      state.display = action.payload;
    })
    .addCase(setEditState.fulfilled, (state, action) => {
      state.edit = action.payload
    })
    .addCase(displayProductList.pending, (state, action) => {
      state.loading = true;
      //console.log(state.display);
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      //state.products = state.products;
    })
  },
})


// export const { createProduct, getProducts } = adminSlice.actions

export default adminSlice.reducer