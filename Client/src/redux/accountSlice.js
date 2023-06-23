import { configureStore } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState ={
    allUsers: [],
    user: [],
}

export const getAllUsers = createAsyncThunk('account/getAllUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:3001/allUsers');
        //console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
      }
    }
)

export const createUser = createAsyncThunk('account/createUser',
  async (input) => {
    const response = await axios.post("http://localhost:3001/user", input)
    return response; 
  }
)
export const loginGoogle = createAsyncThunk('account/loginGoogle', 
  async (decoded) => {
    console.log(decoded);
    return decoded;

});

export const login = createAsyncThunk('account/login',
  async (input) => {
    return input
  }
)


export const logOut = createAsyncThunk('account/logOut',
 () => {

 }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
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
      //CREAR USUARIOS
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false 
        alert('Su usuario se ha creado correctamente!')
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = state.allUsers.find(user => user.email === action.payload.email)
        if(user.password === action.payload.password){
            state.user = user
        }
        console.log(`Welcome back, ${state.user.name}!`);
        state.loading = false
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        const user = state.allUsers.find(user => user.email === action.payload.email)
        state.user = user
        console.log(`Welcome back, ${state.user.name}!`);
        state.loading = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false 
        state.user = []
        console.log('Nos vemos pronto!');
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false
        console.log('Error al cerrar sesión');
      })
      .addCase(logOut.pending, (state, action) => {
        state.loading = true
      })
    },
  });
  
  export default accountSlice.reducer;
  