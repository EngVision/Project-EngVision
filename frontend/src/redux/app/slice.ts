import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId: string | null
  userName: string | null
  userAvatar: string | null
  role: 'Student' | 'Teacher' | 'Admin' | null
  darkMode: boolean
  locales: string
}

const initialState: AppState = {
  userAccountId: null,
  userName: null,
  userAvatar: null,
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
    setUserName: (state, action) => {
      state.userName = action.payload
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload
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
export const {
  setUserAccountId,
  setRole,
  setUserName,
  setUserAvatar,
  toggleDarkMode,
  toggleLocales,
} = appSlice.actions

export default appSlice.reducer
