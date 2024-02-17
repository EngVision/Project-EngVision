import React from 'react'

const LeftComponent = ({
  newMessageCount,
  selectedChat,
  previewChats,
  handleChatClick,
}: any) => {
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
  const chatPreview = previewChats.map((item: any, index: number) => {
    if (item.usersCount === 1) return

    const isSelected = index === selectedChat
    const chatClass = `flex items-center p-2 my-2 border-b border-gray-200 ${
      isSelected ? 'bg-blue-100 rounded-xl' : ''
    } ${newMessageCount > 0 ? 'bg-red-200' : ''}`
    const truncateText = (text: any, maxLength: number) => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
    }

    return (
      <div
        className={chatClass}
        key={index}
        onClick={() => handleChatClick(index)}
      >
        <span className="text-xl flex font-bold text-blue-600 w-10 h-10 rounded-full bg-grey-100 justify-center items-center ">
          {item.usernames[1]?.charAt(0).toUpperCase()}
        </span>
        <div className="ml-2">
          <h4 className="font-bold">{item.usernames[1]}</h4>
          <p className="text-sm text-gray-500">
            {truncateText(item.lastMessage.msg, 25)}
          </p>
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {formatTimestamp(item.lastMessage.ts)}
        </span>
      </div>
    )
  })

  return (
    <div
      className={`flex flex-col border-r border-gray-200 bg-surface p-5 rounded-xl w-1/3`}
    >
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Chats</h1>
      <input
        className="p-2 border-solid border-2 border-blue-500 rounded-xl mb-2"
        type="text"
        placeholder="Search"
      />
      {previewChats ? chatPreview : ''}
    </div>
  )
}

export default LeftComponent
