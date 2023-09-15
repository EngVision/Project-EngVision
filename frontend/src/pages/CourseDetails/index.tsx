import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetails = () => {
  // Get the course identifier from the URL using useParams()
  const { courseId } = useParams()

  // Fetch course details based on the courseId
  // You can use this courseId to load and display course information

  return (
    <div>
      <h2>Course Details</h2>
      <p>Display course details for courseId: {courseId}</p>
      {/* Render course details here */}
    </div>
  )
}

export default CourseDetails
