import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../services/authApi/types'

interface AppState {
  user: IUser | null
  darkMode: boolean
  locales: string
}

const initialState: AppState = {
  user: null,
  darkMode: false,
  locales: 'en',
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleLocales: (state, action) => {
      state.locales = action.payload
    },
  },
})
export const { setUser, toggleDarkMode, toggleLocales } = appSlice.actions

export default appSlice.reducer
