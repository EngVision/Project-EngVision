export interface ResponseData<T = any> {
  data: T
  message: string
  success: boolean
  limit?: number
  offset?: number
  total?: number
}

// order (asc for low(old) to high(new), desc for high(new) to low(old))
export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export interface BasePaginate {
  sortBy?: string
  order?: Order
  page?: number
  limit?: number
}
