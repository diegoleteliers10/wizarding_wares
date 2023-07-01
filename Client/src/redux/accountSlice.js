import { configureStore } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import getCookie from '../hooks/getCookie';
import setCookie from '../hooks/setCookie';
import removeCookie from '../hooks/removeCookie';

const initialState ={
    allUsers: [],
    user: [],
    message: ''
}

export const getAllUsers = createAsyncThunk('account/getAllUsers',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/allUsers');
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
    const response = await axios.post("/user", input)
    return response; 
  }
)
export const loginGoogle = createAsyncThunk('account/loginGoogle', 
  async (googleInfoLogin) => {
    const response = await axios.post("/userLogin", googleInfoLogin)
    return response.data;

});

export const login = createAsyncThunk('account/login',
  async (input) => {
    const response = await axios.post("/userLogin", input)
    //console.log(response.data)
    return response.data;
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
        //alert('Su usuario se ha creado correctamente!')
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = true
      })
      //login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.userInfo;
        
        removeCookie('userInfo');
        setCookie('userInfo', JSON.stringify(action.payload.userInfo))
        removeCookie('userToken');
        setCookie('userToken', JSON.stringify(action.payload.userInfo.token))
        if(action.payload.userInfo.role === 1){
          removeCookie('admin')
          setCookie('admin', JSON.stringify(true))
        }
        if(action.payload.userInfo.verified === true){
          removeCookie('userVerified');
          setCookie('userVerified', JSON.stringify(true))
        }
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action)
        state.message= 'Las credenciales provistas no son válidas'
        state.loading = false
      })
      //LOGIN GOOGLE
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.user = action.payload.userInfo
        console.log(action.payload.userInfo)
        removeCookie('userInfo');
        setCookie('userInfo', JSON.stringify(action.payload.userInfo));
        removeCookie('userToken');
        //los usuarios de google siempre estan verified
        removeCookie('userVerified');
        setCookie('userVerified', JSON.stringify(true))
        setCookie('userToken', JSON.stringify(action.payload.userInfo.token));
        if(action.payload.userInfo.role === 1){
          removeCookie('admin')
          setCookie('admin', JSON.stringify(true))
        }
        state.loading = false
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        console.log(action)
        state.message= 'No hay una cuenta de Wizarding Wares con ese email'
        state.loading = false
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false 
        removeCookie('userInfo');
        removeCookie('admin')
        removeCookie('adminDisplay')
        removeCookie('userVerified')
        removeCookie('userToken');
        state.user = ''
        //console.log('Nos vemos pronto!');
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