import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios  from "axios";
import setCookie from '../hooks/setCookie';
import removeCookie from '../hooks/removeCookie';
import getCookie from '../hooks/getCookie';

const currDisplay = getCookie('adminDisplay');
const tokenRaw = getCookie('userToken')
let token = '';
tokenRaw ? token = JSON.parse(tokenRaw) : token = '';
const headers = {
  Authorization: `Bearer ${token}`
};

const initialState = {
  products: [],
  allProducts: [],
  display: currDisplay ? JSON.parse(currDisplay) : "productList",
  loading: false,
  search: '',
  edit: [],
  filterCategory: false,
  filterStock:'',
  filterRole: false,
  filterActive: '',
  sort: '',
  sort2:'',
  editUser: [],
  allUsers: [],
  refresh: 0,
  allPurchases: []
}

//PRODUCTOS

//get
export const getProducts = createAsyncThunk(
  'admin/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/allProducts');
      //console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
);

//search
export const searchByName = createAsyncThunk(
  'admin/searchByName',
  async (searchQuery) => {
    try {
      const response = await axios.get(`/searchProduct?name=${searchQuery}`);
      return [searchQuery, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)

//post
export const createProd = createAsyncThunk('admin/createProduct',
  async (input) => {
    const response = await axios.post("/productCreated", input,{
      headers: headers
      })
    return response; 
  }
)

//put
export const editProduct = createAsyncThunk('admin/editProduct',
async (input) => {
  const response = await axios.put(`/editProduct/${input.id}`, {name: input.name, price: input.price, description: input.description, stock: input.stock, categoryId:input.categoryId},{
    headers: headers
  });
  return response; 
}
)

//delete

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId) => {
    try {
      const response = await axios.delete(`/deleteProduct/${productId}`,{
        headers: headers
        });
      return response.data;
    } catch (error) { 
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
);

//PRODUCTS: filters
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
          const response = await axios.get(`/filteredProducts?stock=${stock}`);
          return [false, response.data];
        }
        const response = await axios.get(`/filteredProducts?category=${filter}&stock=${stock}`);
        return [filter, response.data]
      }
      if(filter === 'All'){
        const response = await axios.get('/allProducts');
        return [false, response.data];
      }
      //console.log('hay category', filter)
      const response = await axios.get(`/filteredProducts?category=${filter}`);
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
          const response = await axios.get(`/filteredProducts?category=${category}`);
          return ['', response.data]
        }
        const response = await axios.get(`/filteredProducts?category=${category}&stock=${stock}`);
        return [stock, response.data]
      }
      //console.log('hay stock pero no categoria', stock);
      if(stock === 'All'){
        //si me pide todos los de stock y no hay categoria trae todos los productos
        const response = await axios.get(`/allProducts`);
        return ['', response.data]
      }
      const response = await axios.get(`/filteredProducts?stock=${stock}`);
      return [stock, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)

//USERS

//get
export const getAllUsers = createAsyncThunk('admin/getAllUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/allUsers',{
          headers: headers
          })
        return response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
      }
    }
)

//put
export const editUserRole = createAsyncThunk(
  'admin/editUserRole',
  async (input) => {
    const response = await axios.put(`/user_role/${input.userId}`, {roleId: Number(input.roleId), userId: input.userId})
    }
  )
export const editUserData = createAsyncThunk(
  'admin/editUserData',
  async (input) => {
    const response = await axios.put(`/user/${input.userId}`, {name: input.name, email: input.email, password: input.password},{
      headers: headers
      })
    }
  )

  //delete (logico)
  export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId) => {
      try {
        const response = await axios.put(`/user_deleteA/${userId}`, {}, {
          headers: headers
          });
        return response.data;
      } catch (error) { 
        console.error('Error al eliminar el usuario:', error);
        throw error;
      }
    }
  );

  //USERS: filters

  export const filterUserRole = createAsyncThunk(
    'admin/filterUserRole',
    async (role, { getState }) => {
      try {
        const state = getState();
        if(state.admin.filterActive !== ''){
          //si ademas de role, hay isActive
          const active = state.admin.filterActive
          
          if(role === 'All'){
            //si el filtro es all en role es como solo hacer el de isActive
            const response = await axios.get(`/filteredUsers?isActive=${active}`,{
              headers: headers
              })
            return [false, response.data];
          }
          const response = await axios.get(`/filteredUsers?role=${role}&isActive=${active}`,{
            headers: headers
            })
          return [role, response.data]
        }
        if(role === 'All'){
          const response = await axios.get('/allUsers',{
            headers: headers
            })
          return [false, response.data];
        }
        
        const response = await axios.get(`/filteredUsers?role=${role}`,{
          headers: headers
          })
        return [role, response.data];
      } catch (error) {
        console.error('Error obtaining filtered user', error);
        throw error;
      }
    }
  )
  
  export const filterUserActive = createAsyncThunk(
    'admin/filterUserActive',
    async (active, {getState}) =>{
      try {
        const state = getState();
        if(state.admin.filterRole){
          //si hay role ademas de isActive
          const role = state.admin.filterRole;
          //console.log('hay categoria y tmb stock', category, stock);
          if(active === 'All'){
            //si me pide todos los de isActive es lo mismo que traer solo role
            const response = await axios.get(`/filteredUsers?role=${role}`,{
              headers: headers
              })
            return ['', response.data]
          }
          const response = await axios.get(`/filteredUsers?role=${role}&isActive=${active}`,{
            headers: headers
            });
          return [active, response.data]
        }
        if(active === 'All'){
          //si me pide todos los de active y no hay categoria trae todos los users
          const response = await axios.get(`/allUsers`,{
            headers: headers
            });
          return ['', response.data]
        }
        const response = await axios.get(`/filteredUsers?isActive=${active}`,{
          headers: headers
          });
        return [active, response.data];
      } catch (error) {
        console.error('Error obtaining filtered products', error);
        throw error;
      }
    }
  )

  //search
export const searchUserByName = createAsyncThunk(
  'admin/searchUserByName',
  async (searchQuery) => {
    try {
      const response = await axios.get(`/searchUser?name=${searchQuery}`);
      return [searchQuery, response.data];
    } catch (error) {
      console.error('Error obtaining filtered products', error);
      throw error;
    }
  }
)


  //PURCHASES

  //get
  export const getAllPurchases = createAsyncThunk('admin/getAllPurchases',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/allPurchases',{
          headers: headers
          });
        return response.data;
      } catch (error) {
        console.error('Error obtaining purchases:', error);
        throw error;
      }
    }
)

//put
export const editStatus = createAsyncThunk(
  'admin/editStatus',
  async (statusAndId, thunkAPI) => {
    try {
      console.log(statusAndId[0], statusAndId[1])
      console.log(token)
      const statuses = await axios.get('/allStatuses',{
            headers: headers
            });
      const newStatusObject = statuses.data.find((status)=> status.name === statusAndId[0]);
      console.log(newStatusObject.statusId)
      const response = await axios.put(`/editPurchase/${statusAndId[1]}?statusId=${newStatusObject.statusId}`,{},{
        headers: headers
        })
      console.log(response.data)
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
);


//DISPLAYS

export const displayCreate = createAsyncThunk(
  'admin/displayCreate',
  async (_, thunkAPI) => {
    return 'createProduct';
  }
)

export const displayCreateUser = createAsyncThunk(
  'admin/displayCreateUser',
  async (_, thunkAPI) => {
    return 'createUser';
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

export const displayPurchases = createAsyncThunk(
  'admin/displayPurchases',
  async (_, thunkAPI) => {
    return 'purchases';
  }
)

//set
export const setEditState = createAsyncThunk('admin/setEditState',
async (input) => {
  return input; 
  }
)

// SORT PRODUCTS
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
      state.filterRole = false;
      state.filterActive = ''
      state.sort2= '';
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los usuarios:', action.error);
    })
    .addCase(getAllUsers.pending, (state, action) => {
      state.loading = true
    })

    //EDITAR USUARIOS

    //role
    .addCase(editUserRole.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(editUserRole.pending, (state, action) => {
      state.loading = true
    })
    .addCase(editUserRole.rejected, (state, action) => {
      state.loading = false
      // console.log(('error al editar el rol del usuario'));
    })

    //data general
    .addCase(editUserData.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(editUserData.rejected, (state, action) => {
      state.loading = false
      // console.log(('error al editar el rol del usuario'));
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
    .addCase(displayCreateUser.fulfilled, (state, action) => {
      state.display = action.payload;
      removeCookie('adminDisplay')
      setCookie('adminDisplay', JSON.stringify(action.payload))
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
    .addCase(displayPurchases.fulfilled, (state, action) => {
      state.display = action.payload;
      removeCookie('adminDisplay')
      setCookie('adminDisplay', JSON.stringify(action.payload))
    })
    .addCase(displayEditProduct.fulfilled, (state, action) => {
      state.display = action.payload;
    })
    .addCase(displayProductList.pending, (state, action) => {
      state.loading = true;
      //console.log(state.display);
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
    
      //FILTER USER ROLE
      .addCase(filterUserRole.fulfilled, (state, action) => {
        console.log(action.payload[1])
        state.loading = false;
        state.allUsers = action.payload[1];
        state.filterRole = action.payload[0];
      })
      .addCase(filterUserRole.rejected, (state, action) => {
        state.loading = false;
        console.error('Error obtaining filtered products ', action.error);
      })
      .addCase(filterUserRole.pending, (state, action) => {
        state.loading = true;
        //console.log(action);
      })
  
      //FILTER USER ISACTIVE
      .addCase(filterUserActive.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload[1];
        state.filterActive = action.payload[0];
      })
      .addCase(filterUserActive.rejected, (state, action) => {
        state.loading = false;
        console.error('Error obtaining filtered products ', action.error);
      })
      .addCase(filterUserActive.pending, (state, action) => {
        state.loading = true;
        //console.log(action);
      })

      //USER SEARCH
      .addCase(searchUserByName.fulfilled, (state, action) => {
        state.loading = false;
        state.filterRole = false;
        state.filterActive = '';
        state.sort2 = ''
        state.search = action.payload[0]
        state.allUsers = action.payload[1];
        console.log(action.payload[1])
      })
      .addCase(searchUserByName.rejected, (state, action) => {
        state.loading = false;
        console.error('Error obtaining searched users ', action.error);
      })
      .addCase(searchUserByName.pending, (state, action) => {
        state.loading = true;
        console.log(action);
      })

    //ORDENAMIENTOS
    //NOMBRE
    .addCase(sortByNameAscending, (state) => {
      if(state.display === 'productList') {
        state.products.sort((a, b) => a.name.localeCompare(b.name));
        state.sort = 'nameAscending'
      }
      if(state.display === 'users'){
        state.allUsers.sort((a, b) => a.name.localeCompare(b.name));
        state.sort2 = 'nameAscending'
      } 
    })
    .addCase(sortByNameDescending, (state) => {
      if(state.display === 'productList'){
        state.products.sort((a, b) => b.name.localeCompare(a.name));
        state.sort = 'nameDescending'
      } 
      if(state.display === 'users'){
        state.allUsers.sort((a, b) => b.name.localeCompare(a.name));
        state.sort2 = 'nameDescending'
      } 
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
    
    //SET EDIT
    .addCase(setEditState.fulfilled, (state, action) => {
      state.edit = action.payload
    })
    
    //SEARCH PRODUCTS
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
    //DELETE USER (borrado logico)
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.refresh= state.refresh+1
      //state.products = state.products;
    })

    //GET TODAS LAS COMPRAS
    .addCase(getAllPurchases.fulfilled, (state, action) => {
      state.loading = false;
      state.allPurchases = action.payload;
    })
    .addCase(getAllPurchases.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los usuarios:', action.error);
    })
    .addCase(getAllPurchases.pending, (state, action) => {
      state.loading = true
    })

    //EDIT STATUS COMPRA  
    .addCase(editStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.refresh= state.refresh+1
    })
    .addCase(editStatus.rejected, (state, action) => {
      state.loading = false;
      console.error('Error al obtener los usuarios:', action.error);
    })
    .addCase(editStatus.pending, (state, action) => {
      state.loading = true
    })
  },
})


// export const { createProduct, getProducts } = adminSlice.actions

export default adminSlice.reducer