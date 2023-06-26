import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios  from "axios";
import setCookie from '../hooks/setCookie';
import removeCookie from '../hooks/removeCookie';
import getCookie from '../hooks/getCookie';

const currDisplay = getCookie('adminDisplay');

const initialState = {
  products: [],
  allProducts: [],
  display: currDisplay ? JSON.parse(currDisplay) : "productList",
  loading: false,
  search: '',
  edit: [],
  filterCategory: false,
  filterStock:'',
  sort: '',
  editUser: [],
  allUsers: []
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
      //console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
);

export const getAllUsers = createAsyncThunk('admin/getAllUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:3001/allUsers');
        return response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
      }
    }
)

export const searchByName = createAsyncThunk(
  'admin/searchByName',
  async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3001/searchProduct?name=${searchQuery}`);
      return [searchQuery, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)

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

export const filterProductCategory = createAsyncThunk(
  'admin/filterProductCategory',
  async (filter, { getState }) => {
    try {
      const state = getState();
      if(state.admin.filterStock !== ''){
        //si ademas de categoria, hay stock
        const stock = state.admin.filterStock
        //console.log('hay stock y categoria',stock)
        if(filter === 'All'){
          //si el filtro es all en category es como solo hacer el de stock
          const response = await axios.get(`http://localhost:3001/filteredProducts?stock=${stock}`);
          return [false, response.data];
        }
        const response = await axios.get(`http://localhost:3001/filteredProducts?category=${filter}&stock=${stock}`);
        return [filter, response.data]
      }
      if(filter === 'All'){
        const response = await axios.get('http://localhost:3001/allProducts');
        return [false, response.data];
      }
      //console.log('hay category', filter)
      const response = await axios.get(`http://localhost:3001/filteredProducts?category=${filter}`);
      return [filter, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)

export const filterStock = createAsyncThunk(
  'admin/filterStock',
  async (stock, {getState}) =>{
    try {
      const state = getState();
      if(state.admin.filterCategory){
        //si hay categoria ademas de stock
        const category = state.admin.filterCategory;
        //console.log('hay categoria y tmb stock', category, stock);
        if(stock === 'All'){
          //si me pide todos los de stock es lo mismo que traer solo category
          const response = await axios.get(`http://localhost:3001/filteredProducts?category=${category}`);
          return ['', response.data]
        }
        const response = await axios.get(`http://localhost:3001/filteredProducts?category=${category}&stock=${stock}`);
        return [stock, response.data]
      }
      //console.log('hay stock pero no categoria', stock);
      if(stock === 'All'){
        //si me pide todos los de stock y no hay categoria trae todos los productos
        const response = await axios.get(`http://localhost:3001/allProducts`);
        return ['', response.data]
      }
      const response = await axios.get(`http://localhost:3001/filteredProducts?stock=${stock}`);
      return [stock, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)

export const displayEditProduct = createAsyncThunk(
  'admin/displayEditProduct',
  async (_, thunkAPI) => {
    return 'editProduct';
  }
)
export const displayUsers = createAsyncThunk(
  'admin/displayUsers',
  async (_, thunkAPI) => {
    return 'users';
  }
)

export const displayEditUser = createAsyncThunk(
  'admin/displayEditUsers',
  async (_, thunkAPI) => {
    return 'editUser';
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

export const editUserRole = createAsyncThunk(
  'admin/editUserRole',
  async (input) => {
    const response = await axios.put(`http://localhost:3001/user_role/${input.userId}`, {roleId: Number(input.roleId), userId: input.userId})
  }
  )
export const editUserData = createAsyncThunk(
  'admin/editUserData',
  async (input) => {
    const response = await axios.put(`http://localhost:3001/user/${input.userId}`, {name: input.name, email: input.email, password: input.password})
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

export const sortByNameAscending = createAction('admin/sortByNameAscending');
export const sortByNameDescending = createAction('admin/sortByNameDescending');
export const sortByPriceAscending = createAction('admin/sortByPriceAscending');
export const sortByPriceDescending = createAction('admin/sortByPriceDescending');

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    //CREATE PRODUCT
    .addCase(createProd.fulfilled, (state, action) => {
      state.loading = false
      console.log(action.payload);
    })
    .addCase(createProd.rejected, (state, action) => {
      state.loading = false
      //console.log(action);
    })
    .addCase(createProd.pending, (state, action) => {
      state.loading = true
      //console.log(action);
    })

    //EDIT PRODUCTS
    .addCase(editProduct.fulfilled, (state, action) => {
      state.loading = false
      //alert('La actualización se realizó con éxito!')
      console.log(action.payload);
    })
    .addCase(editProduct.rejected, (state, action) => {
      state.loading = false
      //console.log(action);
    })
    .addCase(editProduct.pending, (state, action) => {
      state.loading = true
      //console.log(action);
    })

    //GET PRODUCTS
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      //console.log(action.payload)
      state.products = action.payload;
      state.filterCategory = false;
      state.filterStock = '';
      state.sort = '';
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los productos:', action.error);
    })
    .addCase(getProducts.pending, (state, action) => {
      state.loading = true
    })

    //OBTENER USUARIOS
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los usuarios:', action.error);
    })
    .addCase(getAllUsers.pending, (state, action) => {
      state.loading = true
    })

    //EDITAR USUARIOS
    .addCase(editUserRole.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(editUserRole.rejected, (state, action) => {
      state.loading = false
      console.log(('error al editar el rol del usuario'));
    })
    .addCase(editUserRole.pending, (state, action) => {
      state.loading = true
    })
    .addCase(editUserData.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(editUserData.rejected, (state, action) => {
      state.loading = false
      console.log(('error al editar el rol del usuario'));
    })
    .addCase(editUserData.pending, (state, action) => {
      state.loading = true
    })

    //DISPLAYS
    .addCase(displayCreate.fulfilled, (state, action) => {
      state.display = action.payload;
      removeCookie('adminDisplay')
      setCookie('adminDisplay', JSON.stringify(action.payload))
    })
    .addCase(displayCreate.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(displayProductList.fulfilled, (state, action) => {
      state.display = action.payload;
      removeCookie('adminDisplay')
      setCookie('adminDisplay', JSON.stringify(action.payload))
    })
    .addCase(displayUsers.fulfilled, (state, action) => {
      state.display = action.payload;
      removeCookie('adminDisplay')
      setCookie('adminDisplay', JSON.stringify(action.payload))
    })
    .addCase(displayEditUser.fulfilled, (state, action) => {
      state.display = action.payload;
      console.log(action.payload)
    })

    //FILTER PRODUCT CATEGORY
    .addCase(filterProductCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload[1];
      state.filterCategory = action.payload[0];
    })
    .addCase(filterProductCategory.rejected, (state, action) => {
      state.loading = false;
      console.error('Error obtaining filtered products ', action.error);
    })
    .addCase(filterProductCategory.pending, (state, action) => {
      state.loading = true;
      //console.log(action);
    })

    //FILTER STOCK
    .addCase(filterStock.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload[1];
      state.filterStock = action.payload[0];
    })
    .addCase(filterStock.rejected, (state, action) => {
      state.loading = false;
      console.error('Error obtaining filtered products ', action.error);
    })
    .addCase(filterStock.pending, (state, action) => {
      state.loading = true;
      //console.log(action);
    })

    //ORDENAMIENTOS
    //NOMBRE
    .addCase(sortByNameAscending, (state) => {
      state.products.sort((a, b) => a.name.localeCompare(b.name));
      state.sort = 'nameDescending'
    })
    .addCase(sortByNameDescending, (state) => {
      state.products.sort((a, b) => b.name.localeCompare(a.name));
      state.sort = 'nameAscending'
    })
    //PRECIO
    .addCase(sortByPriceAscending, (state) => {
      state.products.sort((a, b) => b.price-a.price);
      state.sort = 'priceHighToLow'
    })
    .addCase(sortByPriceDescending, (state) => {
      state.products.sort((a, b) => a.price-b.price);
      state.sort = 'priceLowToHigh'
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
    .addCase(searchByName.fulfilled, (state, action) => {
      state.loading = false;
      state.filterCategory = false
      state.search = action.payload[0]
      state.products = action.payload[1];
    })
    .addCase(searchByName.rejected, (state, action) => {
      state.loading = false;
      console.error('Error obtaining searched products ', action.error);
    })
    .addCase(searchByName.pending, (state, action) => {
      state.loading = true;
      console.log(action);
    })
    //DELETE PRODUCT
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      //state.products = state.products;
    })
  },
})


// export const { createProduct, getProducts } = adminSlice.actions

export default adminSlice.reducer