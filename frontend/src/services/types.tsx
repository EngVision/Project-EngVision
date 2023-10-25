export interface ResponseData<T = any> {
  data: T
  message: string
  success: boolean
  limit?: number
  offset?: number
  total?: number
}
