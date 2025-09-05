import { createSlice } from '@reduxjs/toolkit'
import { onLogin, onRegister } from './services'

interface User {
  username: string
  password: string
  isAuth: boolean
  isLoading: boolean
  error: string
}

const initialUserState: User = {
  username: '',
  password: '',
  isAuth: false,
  isLoading: false,
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(onLogin.pending, (state) => {
        state.isLoading = true
        state.isAuth = false
      })
      .addCase(onLogin.fulfilled, (state, action) => {
        state.isAuth = true
        state.isLoading = false
        state.username = action.meta.arg.username
        state.password = action.meta.arg.password
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.error = action.payload.message
      })
      .addCase(onRegister.pending, (state) => {
        state.isLoading = true
        state.isAuth = false
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.isAuth = true
        state.isLoading = false
        state.username = action.meta.arg.username
        state.password = action.meta.arg.password
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.error = action.payload.message
      })
  },
})

export const { reducer: userReducer } = userSlice
