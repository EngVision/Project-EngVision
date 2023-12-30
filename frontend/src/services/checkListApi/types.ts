export interface ICheckListApi {
  user: string
  items: ICheckListItem[]
  isDone: boolean
}
export interface ICheckListItem {
  title: string
  description: string
  link: string
  isDone: boolean
  disabled: boolean
}
