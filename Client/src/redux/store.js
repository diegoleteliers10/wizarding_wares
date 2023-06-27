import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import adminReducer from "./adminSlice"
import accountReducer from "./accountSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    account: accountReducer
  },
})