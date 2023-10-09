import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'antd'
import TickCircle from '../../../components/Icons/TickCircle'
import Circle from '../../../components/Icons/Circle'
import { CourseDetails } from '../../../services/coursesApi/types'
import { AssignmentResponse } from '../../../services/assignmentApi/types'
import assignmentApi from '../../../services/assignmentApi'
import { useNavigate } from 'react-router-dom'
const { Panel } = Collapse
const CourseContent = (course: CourseDetails) => {
  const [assignments, setAssignments] = useState<AssignmentResponse[]>([])
  const completedExerciseIds: string[] = []

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await assignmentApi.getAssignments()
      setAssignments(data)
    }
    fetchAssignments()
  }, [])

  assignments.forEach((assignment) => {
    if (assignment.totalDone === assignment.totalQuestion) {
      completedExerciseIds.push(assignment.exercise)
    }
  })

  function allInArray(array1: string[], array2: string[]) {
    if (array1.length === 0 || array2.length === 0) return false
    // Convert array2 to Set for faster lookup
    const set2 = new Set(array2)

    // Use every() to check if every item in array1 is in set2
    return array1.every((x) => set2.has(x))
  }

  course.sections.forEach((section) => {
    let sectionCompleted: boolean = true
    if (section.lessons.length === 0) {
      sectionCompleted = false
    } else {
      section.lessons.forEach((lesson) => {
        if (allInArray(lesson.exercises, completedExerciseIds)) {
          lesson.completed = true
        } else {
          lesson.completed = false
          sectionCompleted = false
        }
      })
    }
    if (sectionCompleted) {
      section.completed = true
    } else {
      section.completed = false
    }
  })
  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl text-[#2769E7] mb-6">Course Content</h3>
      </div>
      <div>
        <div className="border-dashed border-[1px] rounded-lg">
          {/* Sections */}
          {course.sections.map((section, sectionIndex) => (
            <Collapse
              className="bg-[#FFFCF7]"
              accordion={true} // Set accordion for each panel
              bordered={false} // Remove borders if desired
              expandIconPosition="end"
              onChange={() => {}} // Custom function when panel is expanded/collapsed
            >
              <Panel
                header={
                  <div className="flex items-center text-xl">
                    {section.completed ? (
                      <TickCircle className="mr-2" width={24} height={24} />
                    ) : (
                      <Circle className="mr-2" width={24} height={24} />
                    )}
                    <div className="mr-2">Section {sectionIndex}:</div>
                    <span>{section.title}</span>
                  </div>
                }
                key={sectionIndex.toString()}
              >
                {/* Lessons */}
                {section.lessons.map((lesson, lessonIndex) => (
                  <Collapse
                    className="bg-[#FFFCF7] pl-4"
                    accordion={true} // Set accordion for each panel
                    bordered={false} // Remove borders if desired
                    expandIconPosition="end"
                    onChange={() => {}} // Custom function when panel is expanded/collapsed
                  >
                    <Panel
                      header={
                        <div className="flex items-center text-lg">
                          {lesson.completed ? (
                            <TickCircle
                              className="mr-2"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <Circle className="mr-2" width={24} height={24} />
                          )}
                          <div className="mr-2">Lesson {lessonIndex}:</div>
                          <span>{lesson.title}</span>
                        </div>
                      }
                      key={lessonIndex.toString()}
                    >
                      {/* Exercise */}
                      {lesson.exercises.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex.toString()}
                          className="pl-10 pr-24"
                        >
                          <div className="flex items-center justify-between mb-4 hover:bg-white hover:outline-dashed hover:outline-[1px] hover:outline-[#2769E7] py-2 px-2 rounded-lg">
                            <div className="flex items-center cursor-pointer">
                              {completedExerciseIds.includes(exercise) ? (
                                <TickCircle
                                  className="mr-2"
                                  width={24}
                                  height={24}
                                />
                              ) : (
                                <TickCircle
                                  className="mr-2"
                                  width={24}
                                  height={24}
                                />
                              )}

                              <div className="font-bold text-lg">
                                Exercise {exerciseIndex}
                              </div>
                            </div>
                            <Button
                              onClick={() => navigate(`/exercise/${exercise}`)}
                              type="primary"
                              className="rounded-xl text-lg leading-5 px-6 h-full py-2"
                            >
                              Learn
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Panel>
                  </Collapse>
                ))}
              </Panel>
            </Collapse>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseContent
