import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../services/authApi/types'

interface AppState {
  user: IUser | null
  darkMode: boolean
  locales: string
  isSidebarCollapsed: boolean
}

const initialState: AppState = {
  user: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  locales: 'en',
  isSidebarCollapsed: false,
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
    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload
    },
  },
})
export const { setUser, toggleDarkMode, toggleLocales, setSidebarCollapsed } =
  appSlice.actions

export default appSlice.reducer
