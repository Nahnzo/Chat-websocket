import { createAsyncThunk } from '@reduxjs/toolkit'

interface FormLogin {
  username: string
  password: string
}

export const onRegister = createAsyncThunk<
  unknown,
  FormLogin,
  { rejectValue: { message: string } }
>('user/register', async ({ username, password }, thunkAPI) => {
  try {
    const result = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
    const response = await result.json()

    if (!result.ok) {
      return thunkAPI.rejectWithValue({
        message: response.error,
      })
    }
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error as string,
    })
  }
})

export const onLogin = createAsyncThunk<unknown, FormLogin, { rejectValue: { message: string } }>(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const result = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      })
      const response = await result.json()

      if (!result.ok) {
        return thunkAPI.rejectWithValue({
          message: response.error,
        })
      }

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error as string,
      })
    }
  }
)
