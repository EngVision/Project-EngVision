import React, { useState, useEffect, useRef } from 'react'
import chatApi from '../../services/chatApi'
import LeftComponent from './Components/LeftComponent'
import RightComponent from './Components/RightComponent'
import { SendMessageParams } from '../../services/chatApi/types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setIsNewMessage } from '../../redux/app/slice'

const Chat = () => {
  const dispatch = useAppDispatch()
  const [selectedChat, setSelectedChat] = useState<number | undefined>()
  const [userChat, setUserChat] = useState({
    userId: '',
    authToken: '',
  })
  const [previewChats, setPreviewChats] = useState<any[]>([])
  const [directChats, setDirectChats] = useState<any[]>([])
  const [oppositeIndex, setOppositeIndex] = useState<number>(0)
  const user = useAppSelector((state) => state.app.user)
  const formRef = useRef<any>(null)
  const [rocketChatSocket, setRocketChatSocket] = useState<WebSocket | null>(
    null,
  )

  useEffect(() => {
    if (!rocketChatSocket) {
      const socket = new WebSocket('ws://127.0.0.1:3002/websocket')

      setRocketChatSocket(socket)
    }
    if (
      userChat.userId &&
      userChat.authToken &&
      selectedChat !== undefined &&
      previewChats.length > 0 &&
      formRef.current &&
      rocketChatSocket
    ) {
      socket.onopen = () => {
        const connectRequest = {
          msg: 'connect',
          version: '1',
          support: ['1', 'pre2', 'pre1'],
        }
        socket.send(JSON.stringify(connectRequest))

        const loginRequest = {
          msg: 'method',
          method: 'login',
          id: userChat.userId,
          params: [{ resume: userChat.authToken }],
        }

        socket.send(JSON.stringify(loginRequest))

        const subscribeRequest = {
          msg: 'sub',
          id: 'unique-id',
          name: 'stream-notify-room',
          params: [`${previewChats[selectedChat]?._id}/user-activity`, false],
        }

        socket.send(JSON.stringify(subscribeRequest))

        const subscribeRequest2 = {
          msg: 'sub',
          id: 'unique-id',
          name: 'stream-room-messages',
          params: ['event', false],
        }

        socket.send(JSON.stringify(subscribeRequest2))
      }

      socket.onclose = (event) => {}

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    }

    return () => {
      if (rocketChatSocket) {
        rocketChatSocket.close()
      }
    }
  }, [userChat, selectedChat, previewChats, formRef, rocketChatSocket])

  useEffect(() => {
    const handleRegisterAndLogin = async () => {
      function getCookieValue(cookieName: string) {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim()
          if (cookie.startsWith(cookieName + '=')) {
            return cookie.substring(cookieName.length + 1)
          }
        }
        return null
      }

      const chatUserId = getCookieValue('chat_user_id')
      const chatToken = getCookieValue('chat_token')

      if (chatUserId && chatToken) {
        setUserChat({
          userId: chatUserId,
          authToken: chatToken,
        })
      }
    }

    if (user) {
      handleRegisterAndLogin()
    }
  }, [user])

  const handleGetPreviewChats = async () => {
    try {
      const response = await chatApi.getRoom(
        userChat.userId,
        userChat.authToken,
      )

      response.update.sort((a: any, b: any) => {
        const timeA = new Date(a._updatedAt).getTime()
        const timeB = new Date(b._updatedAt).getTime()
        return timeB - timeA
      })

      const myUserName = response.update.filter((chat: any) => {
        return chat.usersCount === 1
      })[0].usernames[0]

      const filteredChats = response.update.filter((chat: any) => {
        return chat.usersCount === 2 && chat.name !== 'general'
      })

      const index = filteredChats[0].usernames[0] === myUserName ? 1 : 0
      setOppositeIndex(index)

      for (const chat of filteredChats) {
        const opposite = await chatApi.getName(
          userChat.userId,
          userChat.authToken,
          chat.usernames[index],
        )
        chat.oppositeName = opposite.user.name
      }

      setPreviewChats(filteredChats)
    } catch (error) {
      console.error('Error fetching preview chats:', error)
    }
  }

  useEffect(() => {
    if (userChat.userId && userChat.authToken && oppositeIndex !== undefined) {
      handleGetPreviewChats()
    }
  }, [userChat, oppositeIndex])

  useEffect(() => {
    if (selectedChat !== undefined) {
      handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
    }
  }, [selectedChat])

  const handleGetDirectChat = async (userName: string) => {
    try {
      const response = await chatApi.getDirectMessage(
        userChat.userId,
        userChat.authToken,
        userName,
      )

      setDirectChats(response.messages)
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
      if (rocketChatSocket) {
        const socket = new WebSocket('ws://127.0.0.1:3002/websocket')

        socket.onopen = () => {
          const connectRequest = {
            msg: 'connect',
            version: '1',
            support: ['1', 'pre2', 'pre1'],
          }
          socket.send(JSON.stringify(connectRequest))

          const loginRequest = {
            msg: 'method',
            method: 'login',
            id: userChat.userId,
            params: [{ resume: userChat.authToken }],
          }

          socket.send(JSON.stringify(loginRequest))

          const subscribeRequest = {
            msg: 'sub',
            id: 'unique-id',
            name: 'stream-notify-room',
            params: [`${previewChats[selectedChat]?._id}/user-activity`, false],
          }

          socket.send(JSON.stringify(subscribeRequest))

          const sendMessage = {
            msg: 'method',
            method: 'sendMessage',
            params: [
              {
                _id: generateRandomId(),
                rid: previewChats[selectedChat]?._id,
                msg: value,
              },
            ],
            id: '11',
          }
          socket.send(JSON.stringify(sendMessage))
        }

        socket.onclose = (event) => {}

        socket.onerror = (error) => {
          console.error('WebSocket error:', error)
        }

        setRocketChatSocket(socket)
      }
    }
    handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
    handleChatClick(0)
    if (formRef.current) {
      formRef.current.resetFields()
    }
  }

  const handleChatClick = (index: number) => {
    setSelectedChat(index)
    handleGetDirectChat(previewChats[index]?.usernames[oppositeIndex])
    handleGetPreviewChats()

    const subscribeRequest = {
      msg: 'sub',
      id: 'unique-id',
      name: 'stream-notify-room',
      params: [`${previewChats[index]?._id}/user-activity`, false],
    }
    if (rocketChatSocket) {
      rocketChatSocket.send(JSON.stringify(subscribeRequest))
    }
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
          oppositeIndex={oppositeIndex}
          selectedChat={selectedChat}
          previewChats={previewChats}
          directChats={directChats}
          handleSendMessage={handleSendMessage}
          formRef={formRef}
        />
      </div>
    </div>
  )
}

export default Chat
