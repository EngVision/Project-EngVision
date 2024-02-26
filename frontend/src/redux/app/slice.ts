import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../services/authApi/types'
import { IUserLevel } from '../../services/userLevelApi/type'

interface AppState {
  user: IUser | null
  darkMode: boolean
  locales: string
  isSidebarCollapsed: boolean
  showingGetStarted: boolean
  showGetStartedAgain: boolean
  currentLevel: IUserLevel | null
  showingLogoutModal: boolean
}

const initialState: AppState = {
  user: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  locales: 'en',
  isSidebarCollapsed: false,
  showingGetStarted: false,
  showGetStartedAgain: true,
  currentLevel: null,
  showingLogoutModal: false,
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
    showGetStarted: (state) => {
      state.showingGetStarted = true
    },
    hideGetStarted: (state) => {
      state.showingGetStarted = false
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload
    },
    setShowLogoutModal: (state, action) => {
      state.showingLogoutModal = action.payload
    },
  },
})
export const {
  setUser,
  toggleDarkMode,
  toggleLocales,
  setSidebarCollapsed,
  showGetStarted,
  hideGetStarted,
  setCurrentLevel,
  setShowLogoutModal,
} = appSlice.actions

export default appSlice.reducer
