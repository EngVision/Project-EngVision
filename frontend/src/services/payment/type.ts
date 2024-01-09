export interface Payment {
  userId: string
  courseId: string
  orderCode: number
  checkoutUrl: string
  status: string
}

export interface CheckPaidResponse {
  isPaid: boolean
}
