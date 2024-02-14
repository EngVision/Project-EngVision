import React, { useState, useEffect, useRef } from 'react'
import chatApi from '../../services/chatApi'
import { useAppSelector } from '../../hooks/redux'
import LeftComponent from './Components/LeftComponent'
import RightComponent from './Components/RightComponent'
import { SendMessageParams } from '../../services/chatApi/types'

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<number | undefined>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userChat, setUserChat] = useState({
    userId: '',
    authToken: '',
    name: '',
    avatar: '',
  })
  const [previewChats, setPreviewChats] = useState<any[]>([])
  const [directChats, setDirectChats] = useState<any[]>([])
  const user = useAppSelector((state) => state.app.user)
  const formRef = useRef<any>(null)
  const [newMessageCount, setNewMessageCount] = useState(0)
  useEffect(() => {
    const rocketChatSocket = new WebSocket('ws://127.0.0.1:3002/websocket')

    rocketChatSocket.onopen = () => {
      console.log('WebSocket connection established')
      const connectRequest = {
        msg: 'connect',
        version: '1',
        support: ['1', 'pre2', 'pre1'],
      }
      rocketChatSocket.send(JSON.stringify(connectRequest))

      console.log('WebSocket connection established', userChat)
      // Additionally, you can send login and subscribe requests after the connection is open
      const loginRequest = {
        msg: 'method',
        method: 'login',
        id: userChat.userId,
        params: [{ resume: userChat.authToken }],
      }

      rocketChatSocket.send(JSON.stringify(loginRequest))

      const subscribeRequest = {
        msg: 'sub',
        id: 'unique-id',
        name: 'stream-notify-room',
        params: [`${previewChats[selectedChat]?._id}/user-activity`, false],
      }

      rocketChatSocket.send(JSON.stringify(subscribeRequest))
    }

    rocketChatSocket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('Received message from WebSocket:', message)
      // Check if the message is the response you're expecting
      if (
        message.msg === 'changed' &&
        message.collection === 'stream-notify-room'
      ) {
        const userName = message.fields.args[0]
        handleGetDirectChat(userName)
      } else if (
        message.msg === 'changed' &&
        message.collection === 'stream-room-messages'
      ) {
        setNewMessageCount(newMessageCount + 1)
      } else if (
        message.msg === 'changed' &&
        message.collection === 'stream-room-user'
      ) {
        setNewMessageCount(0)
      }
    }

    rocketChatSocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event)
    }

    rocketChatSocket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      rocketChatSocket.close() // Clean up WebSocket connection when component unmounts
    }
  }, [isLoggedIn, userChat, previewChats, directChats, selectedChat]) // Empty dependency array to run only once when component mounts

  useEffect(() => {
    const handleRegisterAndLogin = async () => {
      try {
        const loginResponse = await chatApi.login(
          'engvision_admin',
          'EngVision2023@',
        )
        setUserChat({
          userId: loginResponse.data.userId,
          authToken: loginResponse.data.authToken,
          name: loginResponse.data.me.name,
          avatar: loginResponse.data.me.avatarUrl,
        })
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
        console.error('Error during registration or login:', error)
      }
    }

    if (user) {
      handleRegisterAndLogin()
    }
  }, [user])

  useEffect(() => {
    const handleGetPreviewChats = async () => {
      try {
        const response = await chatApi.getRoom(
          userChat.userId,
          userChat.authToken,
        )
        setPreviewChats(response.update)
        console.log('Preview Chats:', response.update)
      } catch (error) {
        console.error('Error fetching preview chats:', error)
      }
    }

    if (isLoggedIn) {
      handleGetPreviewChats()
    }
  }, [
    isLoggedIn,
    directChats,
    selectedChat,
    userChat.userId,
    userChat.authToken,
  ])

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

  const handleSendMessage = async (value: string) => {
    if (!value) {
      return
    }

    const sendMessageParams: SendMessageParams = {
      rid: previewChats[selectedChat]?._id,
      msg: value,
    }

    if (value.trim() !== '') {
      await chatApi.sendMessage(
        userChat.userId,
        userChat.authToken,
        sendMessageParams,
      )
      // const request = {
      //   msg: 'method',
      //   method: 'sendMessage',
      //   id: '1',
      //   params: [
      //     {
      //       _id: previewChats[selectedChat]?._id,
      //       rid: previewChats[selectedChat]?._id,
      //       msg: value,
      //     },
      //   ],
      // }

      // rocketChatSocket.send(JSON.stringify(request))
    }
    handleGetDirectChat(previewChats[selectedChat]?.usernames[1])
    if (formRef.current) {
      formRef.current.resetFields()
    }
  }

  const handleChatClick = (index: number) => {
    setSelectedChat(index)
    handleGetDirectChat(previewChats[index]?.usernames[1])
  }

  return (
    <div className="h-full">
      <div className="flex h-[100%]">
        <LeftComponent
          newMessageCount={newMessageCount}
          selectedChat={selectedChat}
          previewChats={previewChats}
          handleChatClick={handleChatClick}
        />
        <RightComponent
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
