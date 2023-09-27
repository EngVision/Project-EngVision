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
  },
})
export const { setUserAccountId, setSearchOptions } = appSlice.actions

export default appSlice.reducer

export const darkModeSlice = createSlice({
  initialState,
  name: 'darkMode',
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})
export const { toggleDarkMode } = darkModeSlice.actions

export const localesSlice = createSlice({
  initialState,
  name: 'locales',
  reducers: {
    toggleLocales: (state, action) => {
      state.locales = action.payload
    },
  },
})
export const { toggleLocales } = localesSlice.actions

// const rootReducer = combineReducers({
//   app: authSlice.reducer,
//   darkMode: darkModeSlice.reducer,
//   locales: localesSlice.reducer,
// })

// export default rootReducer
