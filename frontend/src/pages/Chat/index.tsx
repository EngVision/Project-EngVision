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
  const [userChat, setUserChat] = useState<{
    userId: string
    authToken: string
  } | null>(null)
  const [previewChats, setPreviewChats] = useState<any[]>([])
  const [directChats, setDirectChats] = useState<any[]>([])
  const [oppositeIndex, setOppositeIndex] = useState<number>(0)
  const user = useAppSelector((state) => state.app.user)
  const formRef = useRef<any>(null)

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:3002/websocket')

    socket.onopen = () => {
      const connectRequest = {
        msg: 'connect',
        version: '1',
        support: ['1', 'pre2', 'pre1'],
      }
      socket.send(JSON.stringify(connectRequest))

      socket.send(
        JSON.stringify({
          msg: 'method',
          method: 'login',
          id: '1',
          params: [{ resume: 'Ab93RJYtRExw455ST4lTJIOwGr2njfs-gdIIeqIKisQ' }],
        }),
      )

      socket.send(
        JSON.stringify({
          msg: 'sub',
          id: 'JkY4pZ8FRyoegcXGk',
          name: 'stream-notify-user',
          params: ['6LXzvT8A5iXcPMjoq/notification', false],
        }),
      )
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.fields.eventName === '6LXzvT8A5iXcPMjoq/notification') {
        pushNewMessage(data.fields.args[0].payload._id)
        dispatch(setIsNewMessage(true))
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    return () => {
      socket.close()
    }
  }, [])

  const pushNewMessage = async (messageId: string) => {
    if (userChat) {
      console.log(userChat)
      const { message } = await chatApi.getMessage(
        userChat.userId,
        userChat.authToken,
        messageId,
      )
      console.log(message, directChats)
      setDirectChats((prev) => [message, ...prev])
    }
  }

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
    if (selectedChat !== undefined) {
      handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
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
    handleGetDirectChat(previewChats[selectedChat]?.usernames[oppositeIndex])
    handleChatClick(0)
    if (formRef.current) {
      formRef.current.resetFields()
    }
  }

  const handleChatClick = (index: number) => {
    setSelectedChat(index)
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
