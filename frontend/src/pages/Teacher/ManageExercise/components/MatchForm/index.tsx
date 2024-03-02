import { Button, Divider, Form, Input, Select, Switch } from 'antd'
import { FormSubmit } from '../..'
import CustomUpload from '../../../../../components/CustomUpload'
import {
  ExerciseSchema,
  MatchPairSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import {
  CEFRLevel,
  ExerciseMatchType,
  ExerciseTag,
} from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import { DeleteOutlined } from '@ant-design/icons'
import ExerciseTagInput, {
  getTagList,
  transformToExerciseTagInputValue,
} from '../ExerciseTagInput'
import { useTranslation } from 'react-i18next'

interface ContentFormProps {
  index: number
  remove: ((index: number) => void) | null
  firstColumnUseImage: boolean
  secondColumnUseImage: boolean
}

const ContentForm = ({
  index,
  remove,
  firstColumnUseImage,
  secondColumnUseImage,
}: ContentFormProps) => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-10 justify-between items-center">
        <div className="flex flex-col lg:flex-row gap-10 flex-1 items-center">
          <div className="flex-1 flex gap-4 w-full">
            {firstColumnUseImage ? (
              <Form.Item
                className="m-0"
                name={[index, 'columnAImage']}
                valuePropName="fileList"
              >
                <CustomUpload type="picture-card" />
              </Form.Item>
            ) : (
              <Form.Item
                className="flex-1 m-0"
                name={[index, 'columnA']}
                rules={[{ required: true }]}
              >
                <Input placeholder="Content" />
              </Form.Item>
            )}
          </div>

          <div className="flex-1 flex gap-4 w-full">
            {secondColumnUseImage ? (
              <Form.Item
                className="m-0"
                name={[index, 'columnBImage']}
                valuePropName="fileList"
              >
                <CustomUpload type="picture-card" />
              </Form.Item>
            ) : (
              <Form.Item
                className="flex-1 m-0"
                name={[index, 'columnB']}
                rules={[{ required: true }]}
              >
                <Input placeholder="Content" />
              </Form.Item>
            )}
          </div>
        </div>

        {remove && (
          <Button
            danger
            type="primary"
            onClick={() => remove(index)}
            icon={<DeleteOutlined />}
          ></Button>
        )}
      </div>

      <Divider />
    </div>
  )
}

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })

  const form = Form.useFormInstance()
  const content = Form.useWatch('content', form)
  const answers = content ? content[index].answers : []
  const firstColumnUseImage = content?.[index]?.firstColumnUseImage || false
  const secondColumnUseImage = content?.[index]?.secondColumnUseImage || false

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold my-2">
          {t('Question')} {index + 1}
        </p>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            {t('Remove')}
          </Button>
        )}
      </div>
      <div className="flex">
        <Form.Item
          className="flex-1"
          label={t('Question')}
          name={[index, 'questionText']}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            className="h-full"
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder={t('Question')}
          />
        </Form.Item>
      </div>

      <p className="my-2 flex items-center gap-1">
        <span className="text-[#ff4d4f] flex items-center h-1">*</span>
        {t('Contents')}
      </p>
      <div
        className="flex justify-between mb-4 gap-10"
        style={{ marginRight: answers?.length > 1 ? 80 : 0 }}
      >
        <div className="flex justify-between gap-4 flex-1">
          <b className="uppercase">{t('Column A')}</b>
          <div className="flex items-center gap-2">
            <Form.Item
              name={[index, 'firstColumnUseImage']}
              valuePropName="checked"
              noStyle
            >
              <Switch size="small" />
            </Form.Item>
            {t('Use image')}
          </div>
        </div>

        <div className="flex justify-between gap-4 flex-1">
          <b className="uppercase">{t('Column B')}</b>
          <div className="flex items-center gap-2">
            <Form.Item
              name={[index, 'secondColumnUseImage']}
              valuePropName="checked"
              noStyle
            >
              <Switch size="small" />
            </Form.Item>
            {t('Use image')}
          </div>
        </div>
      </div>
      <Form.List name={[index, 'answers']} initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => {
              return (
                <ContentForm
                  key={key}
                  index={name}
                  remove={fields.length > 1 ? remove : null}
                  firstColumnUseImage={firstColumnUseImage}
                  secondColumnUseImage={secondColumnUseImage}
                />
              )
            })}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={'+'}>
                {t('Add content')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item label={t('Explanation')} name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder={t('Explanation (optional)')}
        />
      </Form.Item>
      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Form.Item
            label={t('Tags')}
            name={[index, 'questionTags']}
            rules={[{ required: true }]}
          >
            <ExerciseTagInput />
          </Form.Item>
          <Form.Item
            label={t('Level')}
            name={[index, 'questionLevel']}
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t('Level')}
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
      </div>
    </>
  )
}

interface AnswerFormSchema {
  columnA?: string
  columnB?: string
  columnAImage?: string
  columnBImage?: string
}
interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation?: string
  answers: AnswerFormSchema[]
  firstColumnUseImage?: boolean
  secondColumnUseImage?: boolean
  id?: string
}

interface MatchPayload extends QuestionPayload {
  question: {
    text: string
    pairs: MatchPairSchema[][]
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: MatchPayload = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        text: question.questionText,
        pairs: question.answers.map((ans) => [
          {
            type: question.firstColumnUseImage
              ? ExerciseMatchType.Image
              : ExerciseMatchType.Text,
            content:
              (question.firstColumnUseImage ? ans.columnAImage : ans.columnA) ||
              '',
          },
          {
            type: question.secondColumnUseImage
              ? ExerciseMatchType.Image
              : ExerciseMatchType.Text,
            content:
              (question.secondColumnUseImage
                ? ans.columnBImage
                : ans.columnB) || '',
          },
        ]),
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: MatchPayload) => {
    const firstColumnType = q.question.pairs[0][0].type
    const secondColumnType = q.question.pairs[0][1].type

    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionTags: transformToExerciseTagInputValue(q.tags),
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answers: q.question.pairs.map((ans): AnswerFormSchema => {
        const result: AnswerFormSchema = {}

        if (firstColumnType === ExerciseMatchType.Text) {
          result.columnA = ans[0].content
        } else {
          result.columnAImage = ans[0].content
        }
        if (secondColumnType === ExerciseMatchType.Text) {
          result.columnB = ans[1].content
        } else {
          result.columnBImage = ans[1].content
        }

        return result
      }),
      firstColumnUseImage: firstColumnType === ExerciseMatchType.Image,
      secondColumnUseImage: secondColumnType === ExerciseMatchType.Image,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function MatchForm({ form }: { form: FormSubmit }) {
  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
    <Form.List name="content" initialValue={[{}]}>
      {(fields, { add, remove }) => {
        form.addQuestion = add

        return fields.map(({ key, name }) => (
          <div key={key}>
            <QuestionForm
              index={name}
              remove={fields.length > 1 ? remove : null}
            />
            <Divider />
          </div>
        ))
      }}
    </Form.List>
  )
}

export default MatchForm
