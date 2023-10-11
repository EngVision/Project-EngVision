import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId?: string
  role: 'Student' | 'Teacher' | 'Admin' | ''
  darkMode: boolean | string
  locales: string
}

const initialState: AppState = {
  userAccountId: '',
  role: '',
  darkMode: localStorage.getItem('darkMode') || false,
  locales: localStorage.getItem('locales') || 'en',
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setUserAccountId: (state, action) => {
      state.userAccountId = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode.toString())
    },
    toggleLocales: (state, action) => {
      state.locales = action.payload
      localStorage.setItem('locales', state.locales)
    },
  },
})
export const { setUserAccountId, setRole, toggleDarkMode, toggleLocales } =
  appSlice.actions

export default appSlice.reducer
