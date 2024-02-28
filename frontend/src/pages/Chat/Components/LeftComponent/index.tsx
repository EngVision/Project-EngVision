import React, { useState } from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { setNewNotifyRoomId } from '../../../../redux/app/slice'

const LeftComponent = ({
  selectedChat,
  previewChats,
  handleChatClick,
}: any) => {
  const newNotifyRoomId = useAppSelector((state) => state.app.newNotifyRoomId)
  const [searchTerm, setSearchTerm] = useState('')

  function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`
    const formattedTime = `${date.getHours()}:${
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }`
    return `${formattedDate} ${formattedTime}`
  }

  const filteredChats = previewChats.filter((item: any) => {
    return item.oppositeName.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const chatPreview = filteredChats.map((filteredItem: any) => {
    const index = previewChats.findIndex(
      (previewItem: any) => previewItem._id === filteredItem._id,
    )
    const isSelected = index === selectedChat
    const chatClass = `flex items-center p-2 my-2 border-b border-gray-200  rounded-xl ${
      isSelected ? 'bg-blue-100 text-black' : ''
    }`

    const isNotified = newNotifyRoomId
      ? newNotifyRoomId.includes(filteredItem._id)
      : false

    const backgroundColor = isNotified
      ? 'bg-blue-500 text-white'
      : 'text-gray-500'

    const truncateText = (text: any, maxLength: number) => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
    }

    return (
      <React.Fragment key={index}>
        {filteredItem.lastMessage ? (
          <div
            className={`${chatClass} ${backgroundColor}`}
            onClick={() => handleChatClick(index)}
          >
            <span className="text-xl flex font-bold text-blue-600 w-10 h-10 rounded-full bg-grey-100 justify-center items-center ">
              {filteredItem.oppositeName?.charAt(0).toUpperCase()}
            </span>
            <div className={`ml-2`}>
              <h4 className="font-bold">{filteredItem.oppositeName}</h4>
              <p className="text-sm ">
                {truncateText(filteredItem.lastMessage.msg, 25)}
              </p>
            </div>
            <span className="ml-auto text-sm">
              {formatTimestamp(filteredItem.lastMessage.ts)}
            </span>
          </div>
        ) : null}
      </React.Fragment>
    )
  })

  return (
    <div
      className={`flex flex-col border-r border-gray-200 bg-surface p-5 rounded-xl max-sm:hidden ${
        selectedChat !== undefined ? 'w-1/3' : 'w-full'
      }`}
    >
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Chats</h1>
      <input
        className="p-2 border-solid border-2 border-blue-500 rounded-xl mb-2"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-96">
        {previewChats ? chatPreview : ''}
      </div>
    </div>
  )
}

export default LeftComponent
