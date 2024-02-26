import { CEFRLevel } from '../../utils/constants'

export interface IUserLevel {
  id: string
  user: string
  overall: number
  listening: {
    grammar: number
    vocabulary: number
    comprehension: number
    overall: number
  }
  reading: {
    grammar: number
    vocabulary: number
    skimming: number
    scanning: number
    comprehension: number
    overall: number
  }
  writing: {
    coherence: number
    conciseness: number
    grammar: number
    vocabulary: number
    organization: number
    overall: number
  }
  speaking: {
    grammar: number
    vocabulary: number
    pronunciation: number
    fluency: number
    overall: number
  }
  CEFRLevel: CEFRLevel
}
