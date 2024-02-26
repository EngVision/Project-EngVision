import _ from 'lodash'
import { UPLOAD_FILE_URL } from './constants'

export const getFileUrl = (id: string) => `${UPLOAD_FILE_URL}${id}`

export const getFormattedPrice = (price: number | string) => {
  if (typeof price === 'string') price = parseFloat(price)

  return price || price === 0 ? `${price.toFixed(2)} VND` : '0 VND'
}

export function getFormattedDate(inputDate: string): string {
  const date = new Date(inputDate)
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function cleanObject(obj: any) {
  function internalClean(obj: any) {
    return _.transform(obj, function (result: any, value, key) {
      const isCollection = _.isObject(value)
      const cleaned = isCollection ? internalClean(value) : value

      if (
        _.isNull(cleaned) ||
        _.isUndefined(cleaned) ||
        _.isNaN(cleaned) ||
        cleaned === ''
      ) {
        return
      }

      if (_.isArray(result)) {
        result.push(cleaned)
      } else {
        result[key] = cleaned
      }
    })
  }

  return _.isObject(obj) ? internalClean(obj) : obj
}

export const getQueryParamsUrl = (queries: any) => {
  let url = ''
  for (const key in queries) {
    const value = queries[key]
    if (value !== undefined && value !== null && value.length !== 0) {
      url += `${key}=${value}&`
    }
  }

  return url ? `?${url.slice(0, -1)}` : ''
}

export const getNewWindowPosition = (width: number, height: number): string => {
  return `width=${width},
  height=${height},
  left=${window.innerWidth / 2 - width / 2},
  top=${window.innerHeight / 2 - height / 2 + 50}`
}

export const addAnswersToQuestionTextOfMakeSentenceExercise = (
  answers: string[],
  questionText: string,
) => {
  let questionTextWithAnswers = questionText

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]
    const index = questionTextWithAnswers.indexOf('[]')

    questionTextWithAnswers =
      questionTextWithAnswers.slice(0, index + 1) +
      answer +
      questionTextWithAnswers.slice(index + 1)
  }

  return questionTextWithAnswers
}

type PromiseResolve = (value: unknown) => void
type PromiseReject = (value: unknown) => void
export const validatePassword = (
  resolve: PromiseResolve,
  reject: PromiseReject,
  password: string,
) => {
  if (!password) {
    return resolve('')
  } else if (password.length < 8) {
    return reject('The password must be at least 8 characters long')
  } else if (!/[A-Z]/.test(password)) {
    return reject('The password must be at least 1 uppercase letter')
  } else if (!/[a-z]/.test(password)) {
    return reject('The password must be at at least 1 lower letter')
  } else if (!/^(?=.*[0-9])/.test(password)) {
    return reject('The password must be at least 1 number')
  } else if (!/[\W_]/.test(password)) {
    return reject('The password must be at at least 1 special character')
  } else {
    return resolve('')
  }
}
