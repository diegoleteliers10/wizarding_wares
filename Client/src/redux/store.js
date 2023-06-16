import { configureStore } from '@reduxjs/toolkit'
import user from './userSlice'
import admin from "./adminSlice"

export const store = configureStore({
  reducer: {
    user: user,
    admin: admin
  },
})