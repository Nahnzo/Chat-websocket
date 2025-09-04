import { createSlice } from '@reduxjs/toolkit'
import { onLogin, onRegister } from './services'

interface User {
  username: string
  password: string
  isAuth: boolean
}

const initialUserState: User = {
  username: '',
  password: '',
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        console.log(action)
      })
      .addCase(onLogin.rejected, (state, action) => {
        console.log(action.payload)
      })

      .addCase(onRegister.rejected, (state, action) => {
        console.log(action.payload)
      })
  },
})

export const { reducer: userReducer } = userSlice
