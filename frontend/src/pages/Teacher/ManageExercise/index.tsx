import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, FormInstance, Input, Select, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import coursesApi from '../../../services/coursesApi'
import exerciseApi from '../../../services/exerciseApi'
import { ExerciseSchema } from '../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag, ExerciseType } from '../../../utils/constants'
import enumToSelectOptions from '../../../utils/enumsToSelectOptions'
import CustomUpload from '../../../components/CustomUpload'
import AppLoading from '../../../components/common/AppLoading'
import { ArrowLeftIcon } from '../../../components/Icons'

import ConstructedResponseForm from './components/ConstructedResponseForm'
import ExerciseTagInput, {
  transformToExerciseTagInputValue,
} from './components/ExerciseTagInput'
import FillBlankForm from './components/FillBlankForm'
import MakeSentenceForm from './components/MakeSentenceForm'
import MultipleChoiceForm from './components/MultipleChoiceForm'
import UnscrambleForm from './components/UnscrambleForm'
import SpeakingForm from './components/Speaking'
import MatchForm from './components/MatchForm'
import DragAndDropForm from './components/DragAndDropForm'
import { useTranslation } from 'react-i18next'
import WordSearchForm from './components/WordSearchForm'
import ReactQuill from 'react-quill'

interface GeneralInfo {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Dayjs
  tags?: ExerciseTag[]
  level?: CEFRLevel
}

const GeneralInfoForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  return (
    <>
      <Form.Item<GeneralInfo>
        label={t('Title')}
        name="title"
        rules={[{ required: true }]}
      >
        <Input placeholder={t('Title')} />
      </Form.Item>
      <Form.Item<GeneralInfo> label={t('Description')} name="description">
        <Input.TextArea
          placeholder={t('Description (optional)')}
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item<GeneralInfo>
          label={t('Exercise type')}
          name="type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t('Exercise type')}
            options={enumToSelectOptions(ExerciseType)}
          />
        </Form.Item>
        {/* <Form.Item<GeneralInfo> label="Deadline" name="deadline">
          <DatePicker
            showTime
            placeholder="Deadline (optional)"
            className="w-full"
          />
        </Form.Item> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item<GeneralInfo>
          label={t('Exercise tags')}
          name="tags"
          rules={[{ required: true }]}
        >
          <ExerciseTagInput />
        </Form.Item>
        <Form.Item<GeneralInfo>
          label={t('Exercise level')}
          name="level"
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t('Exercise level')}
            options={enumToSelectOptions(CEFRLevel)}
          />
        </Form.Item>
      </div>
    </>
  )
}

interface ContentQuestion {
  contentQuestion: {
    text: string
    image: string | null
    audio: string | null
  }
}

const ContentQuestionForm = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  return (
    <>
      <Form.Item<ContentQuestion>
        label={t('Question')}
        name={['contentQuestion', 'text']}
      >
        <ReactQuill
          className="bg-surface"
          placeholder={t(
            'Question content - It will be displayed through all the questions (optional)',
          )}
        />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item<ContentQuestion>
          valuePropName="fileList"
          label={t('Question image')}
          name={['contentQuestion', 'image']}
        >
          <CustomUpload type="picture-card" />
        </Form.Item>
        <Form.Item<ContentQuestion>
          valuePropName="fileList"
          label={t('Question audio')}
          name={['contentQuestion', 'audio']}
        >
          <CustomUpload accept="audio/*" type="picture-card" />
        </Form.Item>
      </div>
    </>
  )
}

interface ExerciseFormProps {
  type: ExerciseType
  form: FormSubmit
}

const ExerciseForm = ({ type, form }: ExerciseFormProps) => {
  switch (type) {
    case ExerciseType.MultipleChoice:
      return <MultipleChoiceForm form={form} />
    case ExerciseType.FillBlank:
      return <FillBlankForm form={form} />
    case ExerciseType.ConstructedResponse:
      return <ConstructedResponseForm form={form} />
    case ExerciseType.MakeSentence:
      return <MakeSentenceForm form={form} />
    case ExerciseType.Unscramble:
      return <UnscrambleForm form={form} />
    case ExerciseType.Speaking:
      return <SpeakingForm form={form} />
    case ExerciseType.Match:
      return <MatchForm form={form} />
    case ExerciseType.DragAndDrop:
      return <DragAndDropForm form={form} />
    case ExerciseType.WordSearch:
      return <WordSearchForm form={form} />
    default:
      return <></>
  }
}

export interface FormSubmit extends FormInstance {
  transform: (values: ExerciseSchema) => void
  setInitialContent: (values: ExerciseSchema) => void
  addQuestion: () => void
}

interface FormSchema extends GeneralInfo {
  content: any[]
}

function ManageExercise() {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  const bottomDivRef = useRef<null | HTMLDivElement>(null)
  const [form] = Form.useForm<FormSchema>()
  const type = Form.useWatch('type', form)

  const navigate = useNavigate()

  const { lessonId = '', exerciseId = '' } = useParams()

  const addExerciseMutation = useMutation({
    mutationFn: (exerciseId: string) =>
      coursesApi.addExercise(lessonId, exerciseId),
  })

  const getExercise = async () => {
    if (exerciseId) {
      const data = await exerciseApi.getExercise(exerciseId)
      setInitialValues(form as FormSubmit, data)
    }
  }

  const { isLoading } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: getExercise,
  })

  const createExerciseMutation = useMutation({
    mutationFn: exerciseApi.createExercise,
  })

  const updateExerciseMutation = useMutation({
    mutationFn: (data: ExerciseSchema) =>
      exerciseApi.updateExercise(exerciseId, data),
  })

  const setInitialValues = (formSubmit: FormSubmit, value: ExerciseSchema) => {
    const valueForm = {
      ...value,
      deadline: value.deadline ? dayjs(value.deadline) : undefined,
      tags: transformToExerciseTagInputValue(value.tags as any),
    }
    formSubmit.setFieldsValue(valueForm)

    setTimeout(() => {
      formSubmit.setInitialContent(valueForm)
    }, 100)
  }

  const onSubmit = async (values: ExerciseSchema, formSubmit: FormSubmit) => {
    formSubmit.transform(values)

    values.tags = values.tags?.map((tag: any) => tag.at(-1))

    message.open({
      key: 'submitMessage',
      content: 'loading',
      type: 'loading',
    })

    if (exerciseId) {
      updateExerciseMutation.mutate(values, {
        onSuccess: (exercise) => {
          setInitialValues(form as FormSubmit, exercise)

          message.open({
            key: 'submitMessage',
            content: 'Saved',
            type: 'success',
          })
        },

        onError: (error: any) => {
          message.open({
            key: 'submitMessage',
            content: error.data.message,
            type: 'error',
          })
        },
      })
    } else {
      createExerciseMutation.mutate(values, {
        onSuccess: (data) => {
          if (lessonId && data.id) {
            addExerciseMutation.mutate(data.id, {
              onSuccess: () => {
                navigate('..', { relative: 'path' })
                message.open({
                  key: 'submitMessage',
                  content: 'Created',
                  type: 'success',
                })
              },
              onError: (error) => {
                message.open({
                  key: 'submitMessage',
                  content: error.message,
                  type: 'error',
                })
              },
            })
          }
        },
        onError: (error) => {
          message.open({
            key: 'submitMessage',
            content: error.message,
            type: 'error',
          })
        },
      })
    }
  }

  const addQuestion = (formSubmit: FormSubmit) => {
    formSubmit.addQuestion()
    setTimeout(() => {
      bottomDivRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }, 0)
  }

  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : (
        <Form
          className="flex flex-col h-full"
          form={form}
          onFinish={async (v) => onSubmit(v, form as FormSubmit)}
          layout="vertical"
          scrollToFirstError
        >
          <div className="overflow-y-scroll px-8 pb-4">
            <div className="flex items-center gap-4 my-4">
              <Button
                type="primary"
                ghost
                shape="circle"
                icon={<ArrowLeftIcon width={20} height={20} />}
                onClick={() =>
                  navigate(exerciseId ? '../..' : '..', { relative: 'path' })
                }
              />
              <p className="text-2xl font-bold">{t('General')}</p>
            </div>
            <GeneralInfoForm />
            <p className="text-2xl font-bold my-5">{t('Exercise content')}</p>
            <ContentQuestionForm />
            <ExerciseForm type={type} form={form as FormSubmit} />
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={bottomDivRef}
            ></div>
          </div>
          <div
            className="flex flex-col gap-4 pt-4 px-8 mr-4 z-10"
            style={{ boxShadow: '0px -15px 10px -20px' }}
          >
            {type && (
              <Form.Item noStyle>
                <Button
                  type="dashed"
                  block
                  icon={'+'}
                  onClick={() => addQuestion(form as FormSubmit)}
                >
                  {t('Add question')}
                </Button>
              </Form.Item>
            )}
            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={
                  updateExerciseMutation.isPending ||
                  createExerciseMutation.isPending
                }
              >
                {exerciseId ? t('Save') : t('Create')}
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  )
}

export default ManageExercise
