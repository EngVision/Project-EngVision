import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  setIsNewMessage,
  setNewNotifyRoomId,
  setRemoveNotifyRoomId,
} from '../../redux/app/slice'
import chatApi from '../../services/chatApi'
import { SendMessageParams } from '../../services/chatApi/types'
import LeftComponent from './Components/LeftComponent'
import RightComponent from './Components/RightComponent'

const Chat = () => {
  const dispatch = useAppDispatch()
  const userChat = useAppSelector((state) => state.app.userChat)
  const [selectedChat, setSelectedChat] = useState<number | undefined>()
  const [previewChats, setPreviewChats] = useState<any[]>([])
  const [directChats, setDirectChats] = useState<any[]>([])
  const [myUserName, setMyUserName] = useState<string>('')
  const [oppositeIndex, setOppositeIndex] = useState<number>(0)
  const newNotifyRoomId = useAppSelector((state) => state.app.newNotifyRoomId)

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_URL as string)

    socket.onopen = () => {
      const connectRequest = {
        msg: 'connect',
        version: '1',
        support: ['1'],
      }
      socket.send(JSON.stringify(connectRequest))

      socket.send(
        JSON.stringify({
          msg: 'method',
          method: 'login',
          id: '1',
          params: [{ resume: userChat?.authToken }],
        }),
      )

      socket.send(
        JSON.stringify({
          msg: 'sub',
          id: 'IkY4pZ8FRyoegcXGk',
          name: 'stream-notify-user',
          params: [`${userChat?.userId}/notification`, false],
        }),
      )

      socket.send(
        JSON.stringify({
          msg: 'sub',
          id: 'KkY4pZ8FRyoegcXGk',
          name: 'stream-notify-user',
          params: [`${userChat?.userId}/subscriptions-changed`, false],
        }),
      )

      socket.send(
        JSON.stringify({
          msg: 'sub',
          id: 'JkY4pZ8FRyoegcXGk',
          name: 'stream-notify-user',
          params: [`${userChat?.userId}/rooms-changed`, false],
        }),
      )
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.msg === 'ping') {
        socket.send(
          JSON.stringify({
            msg: 'pong',
          }),
        )
      } else if (data.fields.eventName === `${userChat?.userId}/notification`) {
        pushNewMessage(data.fields.args[0].payload._id)
        dispatch(setNewNotifyRoomId(data.fields.args[0].payload.rid))
      } else if (
        data.fields.eventName === `${userChat?.userId}/rooms-changed`
      ) {
        dispatch(setNewNotifyRoomId(data.fields.args[0].payload.rid))
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }, [])

  const pushNewMessage = async (messageId: string) => {
    if (userChat) {
      const { message } = await chatApi.getMessage(
        userChat.userId,
        userChat.authToken,
        messageId,
      )

      handleGetPreviewChats()
      dispatch(setIsNewMessage(true))

      setDirectChats((prev) => [message, ...prev])
    }
  }

  const handleGetPreviewChats = async () => {
    try {
      if (userChat) {
        const response = await chatApi.getRoom(
          userChat.userId,
          userChat.authToken,
        )

        response.update.sort((a: any, b: any) => {
          const timeA = new Date(a._updatedAt).getTime()
          const timeB = new Date(b._updatedAt).getTime()
          return timeB - timeA
        })

        const filteredChats = response.update.filter((chat: any) => {
          return chat.usersCount === 2 && chat.name !== 'general'
        })

        const userName = await chatApi.getUser(
          userChat.userId,
          userChat.authToken,
        )

        const myUserName = userName.user.username
        setMyUserName(myUserName)

        const index = filteredChats[0].usernames[0] === myUserName ? 1 : 0
        setOppositeIndex(index)

        for (const chat of filteredChats) {
          if (chat.usernames[index] !== myUserName) {
            const opposite = await chatApi.getName(
              userChat.userId,
              userChat.authToken,
              chat.usernames[index],
            )
            chat.oppositeName = opposite.user.name
          } else if (chat.usernames[index] === myUserName) {
            const opposite = await chatApi.getName(
              userChat.userId,
              userChat.authToken,
              chat.usernames[1 - index],
            )
            chat.oppositeName = opposite.user.name
          }
        }

        setPreviewChats(filteredChats)
      }
    } catch (error) {
      console.error('Error fetching preview chats:', error)
    }
  }

  useEffect(() => {
    if (userChat) {
      if (
        userChat.userId &&
        userChat.authToken &&
        oppositeIndex !== undefined
      ) {
        handleGetPreviewChats()
      }
    }
  }, [userChat, oppositeIndex])

  useEffect(() => {
    if (
      selectedChat !== undefined &&
      previewChats[selectedChat]?.usernames[oppositeIndex] !== myUserName
    ) {
      handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
    } else if (
      selectedChat !== undefined &&
      previewChats[selectedChat]?.usernames[oppositeIndex] === myUserName
    ) {
      handleGetDirectChat(
        previewChats[selectedChat]?.usernames[1 - oppositeIndex],
      )
    }
  }, [selectedChat])

  const handleGetDirectChat = async (userName: string) => {
    try {
      if (userChat) {
        const response = await chatApi.getDirectMessage(
          userChat.userId,
          userChat.authToken,
          userName,
        )

        setDirectChats(response.messages)
      }
    } catch (error) {
      console.error('Error fetching direct chat:', error)
    }
  }

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  const handleSendMessage = async (value: string) => {
    if (!value) {
      return
    }

    const sendMessageParams: SendMessageParams = {
      rid: previewChats[selectedChat]?._id,
      msg: value,
    }

    if (value.trim() !== '') {
      userChat &&
        (await chatApi.sendMessage(
          userChat.userId,
          userChat.authToken,
          sendMessageParams,
        ))
    }
    if (
      selectedChat !== undefined &&
      previewChats[selectedChat]?.usernames[oppositeIndex] !== myUserName
    ) {
      handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
    } else if (
      selectedChat !== undefined &&
      previewChats[selectedChat]?.usernames[oppositeIndex] === myUserName
    ) {
      handleGetDirectChat(
        previewChats[selectedChat]?.usernames[1 - oppositeIndex],
      )
    }
    handleChatClick(0)
  }

  const handleChatClick = (index: number) => {
    dispatch(setIsNewMessage(false))
    setSelectedChat(index)

    for (let i = 0; i < newNotifyRoomId.length; i++) {
      if (newNotifyRoomId[i] === directChats[0].rid) {
        dispatch(setRemoveNotifyRoomId(directChats[0].rid))
      }
    }

    if (newNotifyRoomId.length === 1 || newNotifyRoomId === undefined) {
      dispatch(setIsNewMessage(false))
    }
    handleGetPreviewChats()
  }

  return (
    <div className="h-full">
      <div className="flex h-[100%]">
        <LeftComponent
          selectedChat={selectedChat}
          previewChats={previewChats}
          handleChatClick={handleChatClick}
        />

        <RightComponent
          myUserName={myUserName}
          oppositeIndex={oppositeIndex}
          selectedChat={selectedChat}
          previewChats={previewChats}
          directChats={directChats}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}

export default Chat
