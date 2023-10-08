import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId?: string
  role: 'Student' | 'Teacher' | 'Admin' | ''
  darkMode: boolean | string
  locales: string
  searchOptions: string[]
}

const initialState: AppState = {
  userAccountId: '',
  role: '',
  darkMode: localStorage.getItem('darkMode') || false,
  locales: localStorage.getItem('locales') || 'en',
  searchOptions: [],
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
    setSearchOptions: (state, action) => {
      state.searchOptions = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleLocales: (state, action) => {
      state.locales = action.payload
    },
  },
})
export const {
  setUserAccountId,
  setRole,
  setSearchOptions,
  toggleDarkMode,
  toggleLocales,
} = appSlice.actions

export default appSlice.reducer
