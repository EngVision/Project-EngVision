import type { IRoom, ISubscription } from '@rocket.chat/core-typings'
import { createContext, useContext } from 'react'

export const RoomContext = createContext<RoomContextValue | null>(null)
export interface IRoomWithFederationOriginalName extends IRoom {
  federationOriginalName?: string
}

type RoomContextValue = {
  rid: IRoom['_id']
  room: IRoomWithFederationOriginalName
  subscription?: ISubscription
  hasMorePreviousMessages: boolean
  hasMoreNextMessages: boolean
  isLoadingMoreMessages: boolean
}
export const useRoomMessages = (): {
  hasMorePreviousMessages: boolean
  hasMoreNextMessages: boolean
  isLoadingMoreMessages: boolean
} => {
  const context = useContext(RoomContext)

  if (!context) {
    throw new Error('use useRoomMessages only inside opened rooms')
  }

  return {
    hasMorePreviousMessages: context.hasMorePreviousMessages,
    hasMoreNextMessages: context.hasMoreNextMessages,
    isLoadingMoreMessages: context.isLoadingMoreMessages,
  }
}
