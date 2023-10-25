import { createSlice } from '@reduxjs/toolkit'
import { COURSE_STATUS } from '../../utils/constants'
import { CourseDetails } from '../../services/coursesApi/types'

export interface CourseState {
  list: CourseDetails[]
  status: COURSE_STATUS
  sortOption: {
    sortBy: string
    order: 'asc' | 'desc' | ''
  }
  filterOptions: {
    keyword: string
    selectedLevels: string[]
  }
}

const initialState: CourseState = {
  list: [],
  status: COURSE_STATUS.all,
  sortOption: {
    sortBy: '',
    order: '',
  },
  filterOptions: {
    keyword: '',
    selectedLevels: [],
  },
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
    setFilterOptions: (state, action) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload }
    },
    clearFilterOptions: (state) => {
      state.filterOptions = initialState.filterOptions
    },
  },
})

export const {
  setCourseList,
  addNewCourse,
  setCourseStatus,
  setSortOption,
  setFilterOptions,
  clearFilterOptions,
} = courseSlice.actions

export default courseSlice.reducer
