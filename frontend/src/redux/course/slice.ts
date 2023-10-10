import { createSlice } from '@reduxjs/toolkit'
import { COURSE_STATUS } from '../../utils/constants'
import { CourseDetails } from '../../services/coursesApi/types'

interface CourseState {
  list: CourseDetails[]
  status: COURSE_STATUS
  sortOption: 'asc' | 'desc' | ''
}

const initialState: CourseState = {
  list: [],
  status: COURSE_STATUS.published,
  sortOption: '',
}

const courseSlice = createSlice({
  initialState,
  name: 'course',
  reducers: {
    setCourseList: (state, action) => {
      state.list = action.payload
    },
    addNewCourse: (state, action) => {
      state.list.unshift(action.payload)
    },
    setCourseStatus: (state, action) => {
      state.status = action.payload
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
    },
  },
})

export const { setCourseList, addNewCourse, setCourseStatus, setSortOption } =
  courseSlice.actions

export default courseSlice.reducer
