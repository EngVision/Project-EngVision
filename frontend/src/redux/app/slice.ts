import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  userAccountId?: string
}

const initialState: AppState = {
  userAccountId: '',
}

const authSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setUserAccountId: (state, action) => {
      state.userAccountId = action.payload
    },
  },
})

export const { setUserAccountId } = authSlice.actions

export default authSlice.reducer
