import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../services/authApi/types'
import { IUserLevel } from '../../services/userLevelApi/type'
import { IUserChat } from '../../services/chatApi/types'

interface AppState {
  user: IUser | null
  userChat: IUserChat | null
  darkMode: boolean
  locales: string
  isSidebarCollapsed: boolean
  showingGetStarted: boolean
  showGetStartedAgain: boolean
  currentLevel: IUserLevel | null
  showingLogoutModal: boolean
  isNewMessage: boolean
  newNotifyRoomId: string[]
}

const initialState: AppState = {
  user: null,
  userChat: null,
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  locales: 'en',
  isSidebarCollapsed: false,
  showingGetStarted: false,
  showGetStartedAgain: true,
  currentLevel: null,
  showingLogoutModal: false,
  isNewMessage: false,
  newNotifyRoomId: [],
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserChat: (state, action) => {
      state.userChat = action.payload
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
    setIsNewMessage: (state, action) => {
      state.isNewMessage = action.payload
    },
    setNewNotifyRoomId: (state, action) => {
      if (state.newNotifyRoomId === undefined) state.newNotifyRoomId = []
      if (state.newNotifyRoomId.includes(action.payload)) return
      state.newNotifyRoomId.push(action.payload)
    },
    setRemoveNotifyRoomId: (state, action) => {
      state.newNotifyRoomId = state.newNotifyRoomId.filter(
        (id) => id !== action.payload,
      )
    },
  },
})
export const {
  setUser,
  setUserChat,
  toggleDarkMode,
  toggleLocales,
  setSidebarCollapsed,
  showGetStarted,
  hideGetStarted,
  setCurrentLevel,
  setShowLogoutModal,
  setIsNewMessage,
  setNewNotifyRoomId,
  setRemoveNotifyRoomId,
} = appSlice.actions

export default appSlice.reducer
