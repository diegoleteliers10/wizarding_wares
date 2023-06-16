import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  allProducts: [],
  detail: [],    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
})


export const {  } = userSlice.actions

export default userSlice.reducer