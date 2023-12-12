import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import AppLoading from '../../components/common/AppLoading'
import { useParams } from 'react-router-dom'
import exerciseApi from '../../services/exerciseApi'
import { examApi } from '../../services/examApi'
import { Part } from '../../services/examApi/type'
import { useEffect, useRef, useState } from 'react'
import Exercise from '../Exercise'
import submissionApi from '../../services/submissionApi'
import { examSubmissionApi } from '../../services/examSubmissionApi'
import {
  ExamSubmitAnswer,
  ObjectId,
} from '../../services/examSubmissionApi/type'
import ProgressExam from '../Exercise/components/ProgressExam'

const DoExam = () => {
  const { examId = '' } = useParams()
  const [partIndex, setPartIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const queryClient = useQueryClient()
  const firstLoad = useRef<boolean>(true)

  const { data: exam, isLoading: isLoadingExam } = useQuery({
    queryKey: ['exam', examId],
    queryFn: () => examApi.getExamById(examId),
  })

  const { data: examSubmissions } = useQuery({
    queryKey: ['examSubmissions', examId],
    queryFn: () => {
      return examSubmissionApi.getExamSubmissionByExamId(examId)
    },
    retry: false,
  })

  const fetchParts = async (parts: Part[]) => {
    const partsPromises = parts.map((part) =>
      exerciseApi.getExercise(part?.id ?? ''),
    )
    const partsRes = await Promise.all(partsPromises)
    return partsRes
  }

  const fetchSubmissions = async (objectId: ObjectId) => {
    return submissionApi.getSubmissionById(objectId?.id ?? '')
  }

  const { data: parts, isLoading: isLoadingParts } = useQuery({
    queryKey: ['parts', examId],
    queryFn: () => fetchParts(exam?.parts || []),
    enabled: !!exam,
  })

  const submissions = useQueries({
    queries: examSubmissions?.submissions
      ? examSubmissions.submissions.map((submissionId) => {
          return {
            queryKey: ['submissions', submissionId],
            queryFn: () => {
              return fetchSubmissions(submissionId)
            },
          }
        })
      : [],
  }).map((query) => query.data)

  const submitAnswerMutation = useMutation({
    mutationFn: ({
      examId,
      data,
    }: {
      examId: string
      data: ExamSubmitAnswer
    }) => examSubmissionApi.submitAnswer(examId, data),
  })

  const setInitQuestion = () => {
    for (let indexP = 0; indexP < (parts?.length || 0); indexP++) {
      const part = parts?.[indexP]
      const numberQuestion = part?.content.length || 0
      const numberSubmission = submissions?.[indexP]?.detail?.length || 0
      if (numberQuestion > numberSubmission) {
        setPartIndex(indexP)
        setQuestion(numberSubmission)
        return
      }
    }

    const lastPartIndex = (parts?.length || 0) - 1
    setPartIndex(lastPartIndex)
    setQuestionIndex(parts?.[lastPartIndex]?.content.length || 0)
  }

  useEffect(() => {
    if (
      firstLoad.current &&
      parts &&
      submissions !== undefined &&
      examSubmissions
    ) {
      firstLoad.current = false
      setInitQuestion()
    }
  }, [submissions, parts])

  const submitAnswer = async (
    data: ExamSubmitAnswer,
    examId: string,
  ): Promise<void> => {
    if (parts?.[partIndex]?.id) {
      submitAnswerMutation.mutate(
        { examId, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['examSubmissions'] })
          },
        },
      )
    }
  }

  const onFinish = (values: any) => {
    submitAnswer(
      {
        ...values,
        partId: parts?.[partIndex]?.id,
        questionId: parts?.[partIndex]?.content[questionIndex].id || '',
      },
      examId,
    )
  }

  const canGotoQuestion = (indexP: number, indexQ: number) => {
    return (
      calcPositionQuestion(indexP, indexQ) - 1 <=
      (examSubmissions?.totalDone || 0)
    )
  }

  const calcPositionQuestion = (indexP: number, indexQ: number) => {
    let pos = 0
    for (let i = 0; i < indexP; i++) {
      pos += parts?.[i]?.content.length || 0
    }
    return pos + indexQ + 1
  }

  const gotoQuestion = (indexP: number, indexQ: number) => {
    if (canGotoQuestion(indexP, indexQ)) {
      setPartIndex(indexP)
      setQuestionIndex(indexQ)
    }
  }

  const QuizProgressComponent = () => {
    return (
      <ProgressExam
        parts={parts}
        submissions={submissions}
        partIndex={partIndex}
        questionIndex={questionIndex}
        gotoQuestion={gotoQuestion}
        canGotoQuestion={canGotoQuestion}
      />
    )
  }

  const setQuestion = (questionIndex: number) => {
    // case last question in part
    if (questionIndex + 1 > (parts?.[partIndex].content.length || 0)) {
      if (partIndex + 1 < (parts?.length || 0)) {
        setQuestionIndex(0)
        setPartIndex(partIndex + 1)
      } else setQuestionIndex(questionIndex)
    }
    // case back previous part
    else if (questionIndex < 0) {
      const index =
        parts?.[partIndex - 1]?.content?.length && partIndex > 0
          ? parts[partIndex - 1].content.length - 1
          : 0
      setQuestionIndex(index)
      setPartIndex(partIndex - 1)
    } else setQuestionIndex(questionIndex)
  }

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['submissions', examSubmissions?.submissions.at(-1)],
    })
  }, [examSubmissions])

  if (isLoadingExam || isLoadingParts) {
    return <AppLoading />
  }

  return (
    <Exercise
      exercise={parts?.[partIndex]}
      submission={submissions?.[partIndex]}
      questionIndex={questionIndex}
      hasPreviousPart={partIndex > 0}
      grade={examSubmissions?.grade}
      setQuestion={setQuestion}
      onFinishFunc={onFinish}
      QuizProgressComponent={QuizProgressComponent}
      backUrl="/home"
    />
  )
}

export default DoExam
