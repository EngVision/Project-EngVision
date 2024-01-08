export interface AchievementItem {
  title: string
  description: string
  image: string
  progress: number
}

export interface Achievement {
  id: string
  user: string
  items: AchievementItem[]
}
