import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId?: string
  role: 'Student' | 'Teacher' | 'Admin' | ''
  theme: string
  locales: string
}

const initialState: AppState = {
  userAccountId: '',
  role: '',
  theme: localStorage.getItem('theme') || 'light',
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
    toggleDarkMode: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
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
