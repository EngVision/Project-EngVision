import { useReducer } from 'react'

export function useForceRerender(): () => void {
  return useReducer(() => ({}), {})[1] as () => void
}
