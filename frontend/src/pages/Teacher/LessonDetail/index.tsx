import React, { useEffect, useState } from 'react'
import { lessonApi } from '../../../services/lessonApi'
import { useParams } from 'react-router-dom'
import ExerciseTable from './ExerciseTable'
import { LessonType } from '../../../services/lessonApi/type'

const LessonDetail = () => {
  const { lessonId } = useParams()
  const [lesson, setLesson] = useState<LessonType>()
  console.log('🚀 ~ file: index.tsx:9 ~ LessonDetail ~ lesson:', lesson)

  const getLesson = async () => {
    try {
      if (lessonId) {
        const { data } = await lessonApi.getLesson(lessonId)

        setLesson(data)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    getLesson()
  }, [])

  return (
    <div>
      <h2 className="mb-8">{lesson?.title}</h2>
      <ExerciseTable exerciseList={lesson?.exercises ?? []} />
    </div>
  )
}

export default LessonDetail
