import { createSlice } from '@reduxjs/toolkit'
import { COURSE_STATUS } from '../../utils/constants'

const initialState = {
  status: COURSE_STATUS.published,
}

const courseSlice = createSlice({
  initialState,
  name: 'course',
  reducers: {
    setCourseStatus: (state, action) => {
      state.status = action.payload
    },
  },
})

export const { setCourseStatus } = courseSlice.actions

export default courseSlice.reducer
