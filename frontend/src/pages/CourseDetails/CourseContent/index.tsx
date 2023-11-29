import { useQuery } from '@tanstack/react-query'
import { Button, Collapse } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Circle from '../../../components/Icons/Circle'
import TickCircle from '../../../components/Icons/TickCircle'
// import { useState, useEffect } from 'react'
import { CourseDetails } from '../../../services/coursesApi/types'
import submissionApi from '../../../services/submissionApi'
import AppLoading from '../../../components/common/AppLoading'
const { Panel } = Collapse
const CourseContent = (course: CourseDetails) => {
  const params = useParams()
  const completedExerciseIds: string[] = []

  const navigate = useNavigate()
  const { data: rawSubmissionList, isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => submissionApi.getSubmissionList({ course: params.courseId }),
  })
  if (isLoading) return <AppLoading />

  // let lastLessonID: string = ''
  if (course.isAttended && rawSubmissionList?.data?.length) {
    // const lastSubmissionID = rawSubmissionList?.data?.slice(-1)[0]?.exercise?.id
    rawSubmissionList.data.map((submission) => {
      if (submission.totalDone === submission.totalQuestion) {
        completedExerciseIds.push(submission.exercise?.id)
      }
    })
    course.sections?.forEach((section) => {
      section.completed = true
      let countLessonCompleted: number = 0

      if (section.lessons?.length === 0) {
        section.completed = false
      } else {
        section?.lessons?.forEach((lesson) => {
          if (!lesson.exercises) return
          lesson.completed = true
          let countExerciseCompleted: number = 0

          if (lesson.exercises?.length === 0) {
            lesson.completed = false
          } else {
            lesson.exercises?.forEach((exercise) => {
              // if (lastSubmissionID === exercise.id) {
              //   lastLessonID = lesson.id
              // }
              if (completedExerciseIds.includes(exercise.id)) {
                exercise.completed = true
                countExerciseCompleted++
              } else {
                exercise.completed = false
                lesson.completed = false
              }
            })
          }

          if (lesson.completed) {
            countLessonCompleted++
          } else {
            lesson.completed = false
            section.completed = false
          }
          lesson.totalExerciseCompleted = countExerciseCompleted
        })
      }

      if (!section.completed) {
        section.completed = false
      }
      section.totalLessonCompleted = countLessonCompleted
    })
  }

  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl text-primary mb-6">Course Content</h3>
      </div>

      <div className="border-dashed border-[1px] rounded-lg">
        {/* Sections */}

        <Collapse
          // accordion={true} // Set accordion for each panel
          bordered={false} // Remove borders if desired
          expandIconPosition="end"
          onChange={() => {}} // Custom function when panel is expanded/collapsed
          defaultActiveKey={course?.sections?.map((section) => section.id)}
        >
          {course?.sections?.map((section, sectionIndex) => (
            <Panel
              header={
                <div className="flex items-center text-xl">
                  {section.completed &&
                  section.lessons?.length &&
                  course?.isAttended ? (
                    <TickCircle className="mr-2" width={24} height={24} />
                  ) : (
                    <Circle className="mr-2" width={24} height={24} />
                  )}

                  <div className="mr-2">Section {sectionIndex}:</div>
                  <span>{section.title}</span>
                </div>
              }
              extra={
                <div className="text-xs text-gray-500">
                  {section?.totalLessonCompleted
                    ? section?.totalLessonCompleted
                    : '0'}{' '}
                  / {section?.lessons?.length}
                </div>
              }
              key={section?.id}
            >
              {/* Lessons */}

              <Collapse
                className="pl-4"
                // accordion={true} // Set accordion for each panel
                bordered={false} // Remove borders if desired
                expandIconPosition="end"
                onChange={() => {}} // Custom function when panel is expanded/collapsed
              >
                {section.lessons?.map((lesson, lessonIndex) => (
                  <Panel
                    collapsible={course?.isAttended ? undefined : 'disabled'}
                    header={
                      <div className="flex items-center text-lg">
                        {lesson?.completed && lesson.exercises?.length ? (
                          <TickCircle className="mr-2" width={24} height={24} />
                        ) : (
                          <Circle className="mr-2" width={24} height={24} />
                        )}
                        <div className="mr-2">Lesson {lessonIndex + 1}:</div>
                        <span>{lesson.title}</span>
                      </div>
                    }
                    extra={
                      course.isAttended &&
                      lesson.exercises?.length > 0 && (
                        <div className="text-xs text-wolfGrey">
                          {`${
                            lesson.totalExerciseCompleted
                              ? lesson.totalExerciseCompleted
                              : 0
                          } / ${lesson.exercises?.length}`}
                        </div>
                      )
                    }
                    key={lesson.id}
                  >
                    {/* Exercise */}
                    {course.isAttended &&
                      lesson.exercises?.map((exercise, exerciseIndex) => (
                        <div
                          key={exerciseIndex.toString()}
                          className="pl-10 pr-24"
                        >
                          <div className="flex items-center justify-between mb-4 hover:outline-dashed hover:outline-[1px] hover:outline-primary py-2 px-2 rounded-lg">
                            <div className="flex items-center cursor-pointer">
                              {completedExerciseIds.includes(exercise.id) ? (
                                <TickCircle
                                  className="mr-2"
                                  width={24}
                                  height={24}
                                />
                              ) : (
                                <Circle
                                  className="mr-2"
                                  width={24}
                                  height={24}
                                />
                              )}

                              <div className="font-bold text-lg">
                                Exercise: {exercise.title}
                              </div>
                            </div>
                            <Button
                              onClick={() =>
                                navigate(`./exercise/${exercise.id}`)
                              }
                              type="primary"
                              className="rounded-xl text-lg leading-5 px-6 h-full py-2"
                            >
                              Learn
                            </Button>
                          </div>
                        </div>
                      ))}
                  </Panel>
                ))}
              </Collapse>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  )
}

export default CourseContent
