export interface ObjectId {
  id: string
}

export interface ExamSubmitAnswer {
  partId: string
  questionId: string
  answer: any
}

export interface ExamSubmissionResponse {
  grade: number
  submissions: ObjectId[]
  totalDone: number
}
