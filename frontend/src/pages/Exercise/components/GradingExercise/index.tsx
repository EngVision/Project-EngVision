import { useEffect, useState } from 'react'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseSchema } from '../../../../services/exerciseApi/types'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface GradingExerciseProps {
  exercise?: ExerciseSchema
  submission?: SubmissionResponse
  questionIndex: number
  isButtonLoading?: boolean
}

const Grade = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function GradingExercise({
  exercise,
  submission,
  questionIndex,
  isButtonLoading,
}: GradingExerciseProps) {
  const [grade, setGrade] = useState<number>(-1)
  const form = Form.useFormInstance()

  useEffect(() => {
    form.setFieldValue('grade', submission?.detail[questionIndex]?.grade)
    form.setFieldValue(
      'explanation',
      submission?.detail[questionIndex]?.explanation,
    )
    form.setFieldValue(
      'teacherCorrection',
      submission?.detail[questionIndex]?.teacherCorrection,
    )

    setGrade(
      submission?.detail[questionIndex]?.grade
        ? submission?.detail[questionIndex]?.grade
        : -1,
    )
  }, [submission, questionIndex])

  return (
    <>
      {questionIndex < (exercise?.content?.length || 0) && (
        <div>
          <Form.Item
            className="mb-3"
            label="Points"
            name="grade"
            initialValue={submission?.detail[questionIndex]?.grade}
            rules={[
              { required: true },
              () => ({
                async validator(_, value) {
                  return new Promise((resolve, reject) => {
                    if (
                      value &&
                      (!Number(value) ||
                        Number(value) > 10 ||
                        Number(value) < 0)
                    ) {
                      reject(new Error('Grade must be between 0 and 10'))
                    } else {
                      resolve('')
                      setGrade(value ? Number(value) : -1)
                    }
                  })
                },
              }),
            ]}
          >
            <Input className="w-[50px]" />
          </Form.Item>
          <div className="flex gap-1 flex-wrap mb-5">
            {Grade.map((g) => (
              <Button
                key={g}
                onClick={() => {
                  form.setFieldValue('grade', g)
                  setGrade(g)
                }}
                type={g === grade ? 'primary' : 'default'}
              >
                {g}
              </Button>
            ))}
          </div>
          <p className="mb-3">Explanation</p>
          <Form.Item
            name="explanation"
            initialValue={submission?.detail[questionIndex]?.explanation}
          >
            <TextArea
              placeholder="Explanation (Optional)"
              autoSize={{ minRows: 4, maxRows: 15 }}
            />
          </Form.Item>
          <div className="w-full text-center">
            <Button
              type="primary"
              onClick={() => {
                form.submit()
              }}
              loading={isButtonLoading}
            >
              Grade
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default GradingExercise
