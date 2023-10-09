import { createSlice } from '@reduxjs/toolkit'
import { COURSE_STATUS } from '../../utils/constants'

interface CourseState {
  status: COURSE_STATUS
  sortOption: 'asc' | 'desc' | ''
}

const initialState: CourseState = {
  status: COURSE_STATUS.published,
  sortOption: '',
}

const courseSlice = createSlice({
  initialState,
  name: 'course',
  reducers: {
    setCourseStatus: (state, action) => {
      state.status = action.payload
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
    },
  },
})

export const { setCourseStatus, setSortOption } = courseSlice.actions

export default courseSlice.reducer
