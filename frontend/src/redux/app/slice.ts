import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId: string | null
  role: 'Student' | 'Teacher' | 'Admin' | null
  darkMode: boolean | string
  locales: string
}

const initialState: AppState = {
  userAccountId: null,
  role: null,
  darkMode: false,
  locales: 'en',
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
    },
    toggleLocales: (state, action) => {
      state.locales = action.payload
    },
  },
})
export const { setUserAccountId, setRole, toggleDarkMode, toggleLocales } =
  appSlice.actions

export default appSlice.reducer
