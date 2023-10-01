import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId?: string
  darkMode: boolean | string
  locales: string
  searchOptions: string[]
}

const initialState: AppState = {
  userAccountId: '',
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
  setSearchOptions,
  toggleDarkMode,
  toggleLocales,
} = appSlice.actions

export default appSlice.reducer
