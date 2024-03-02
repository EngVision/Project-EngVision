import { Button, Form, Input } from 'antd'
import Send from '../../../../components/Icons/Send'
import { useAppDispatch } from '../../../../hooks/redux'
import { setIsNewMessage } from '../../../../redux/app/slice'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useRef, useState } from 'react'
import Icon from '../../../../components/Icons/Icon'

const RightComponent = ({
  oppositeIndex,
  selectedChat,
  previewChats,
  directChats,
  handleSendMessage,
}: any) => {
  if (selectedChat === undefined) {
    return null
  }

  const dispatch = useAppDispatch()
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }

    // Thêm event listener để theo dõi sự kiện click ra ngoài
    document.addEventListener('mousedown', handleClickOutside)

    // Xóa event listener khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [emojiPickerRef])

  const onFinish = (values: any) => {
    // Gửi tin nhắn khi nút gửi được nhấn
    sendMessage(values.value)
    form.resetFields()
  }

  const sendMessage = (message: string) => {
    // Kiểm tra xem tin nhắn có rỗng không
    if (message.trim() === '') {
      return
    }

    handleSendMessage(message)
  }

  const handleEmojiSelect = (emoji: any) => {
    const currentValue = form.getFieldValue('value')

    form.setFieldsValue({
      value: currentValue ? currentValue + emoji.emoji : emoji.emoji,
    })
  }

  return (
    <div className="flex flex-col w-2/3 bg-surface ml-5 px-5 rounded-xl justify-between">
      {/* Chat messages */}
      <div className="flex flex-col p-2 h-[90%]">
        <div className="flex flex-row justify-between border-solid border-b border-0 border-gray-300">
          <div className="flex flex-row items-center">
            <span className="text-xl flex font-bold text-blue-600 w-10 h-10 rounded-full bg-grey-100 justify-center items-center">
              {previewChats[selectedChat].oppositeName.charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col p-2 mb-2">
              <h4 className="font-bold">
                {previewChats[selectedChat].oppositeName}
              </h4>
            </div>
          </div>

          {/* Call Icon */}
          {/* <div className="ml-4 flex items-center">
            {/* Call Icon Component */}
          {/* <Call /> */}
          {/* </div> */}
        </div>

        {/* Chat messages */}
        <div className="overflow-y-auto flex-grow h-[32rem] m-0 p-0 flex flex-col-reverse">
          {/* Loop through and display direct messages */}
          {directChats.slice().map((message: any, index: any) => {
            // Kiểm tra xem tin nhắn hiện tại có cùng oppositeName với tin nhắn trước đó không
            const showOppositeName =
              index === directChats.length - 1 ||
              directChats[index + 1].u.username !==
                previewChats[selectedChat].usernames[oppositeIndex]

            const showAvatar =
              index === 0 ||
              directChats[index - 1].u.username !==
                previewChats[selectedChat].usernames[oppositeIndex]

            return (
              <div
                key={message._id}
                className={`flex flex-col p-1 border-b border-gray-200 ${
                  message.u.username !==
                  previewChats[selectedChat].usernames[oppositeIndex]
                    ? 'items-end'
                    : 'items-start'
                }`}
              >
                <div className="flex items-end">
                  {showAvatar &&
                    message.u.username ===
                      previewChats[selectedChat].usernames[oppositeIndex] && (
                      <div
                        className={`flex${
                          message.u.username !==
                          previewChats[selectedChat].usernames[oppositeIndex]
                            ? 'order-1'
                            : ''
                        }`}
                      >
                        <span className="text-xl flex font-bold text-blue-600 w-9 h-9 rounded-full bg-grey-100 justify-center items-center">
                          {previewChats[selectedChat].oppositeName
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}

                  {/* Individual Chat Message */}
                  <div
                    className={`rounded-md ml-2 ${
                      message.u.username !==
                      previewChats[selectedChat].usernames[oppositeIndex]
                        ? 'text-right'
                        : ''
                    }`}
                  >
                    {/* Hiển thị oppositeName nếu là tin nhắn đầu tiên trong nhóm */}
                    {showOppositeName &&
                      message.u.username ===
                        previewChats[selectedChat].usernames[oppositeIndex] && (
                        <h4
                          className={`text-[0.8rem] mb-1 font-[400] ${
                            !showAvatar ? 'ml-10' : ''
                          }`}
                        >
                          {previewChats[selectedChat].oppositeName}
                        </h4>
                      )}
                    <div
                      className={`border-solid border-2 ${
                        !showAvatar ? 'ml-9' : ''
                      } ${
                        message.u.username !==
                        previewChats[selectedChat].usernames[oppositeIndex]
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-grey-100 bg-grey-100 text-gray-700'
                      } rounded-lg p-2 w-fit`}
                    >
                      <p className="text-sm">{message.msg}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Text input send message */}
      <Form
        name="customForm"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: '100%' }}
        form={form}
      >
        <div className="flex items-center p-2 border-t border-gray-200 w-[100%]">
          <Form.Item
            name="value"
            style={{ flex: 1, marginRight: '8px', position: 'relative' }}
          >
            <Input
              id="messageInput"
              className="w-full p-2 rounded-lg border-solid border-2 border-blue-500 bg-surface"
              placeholder="Your messages..."
              suffix={
                <Button
                  className="m-0"
                  type="text"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Icon />
                </Button>
              }
            />
          </Form.Item>

          <Button
            className="mb-6 p-1 bg-surface rounded h-12"
            type="text"
            htmlType="submit"
          >
            <Send />
          </Button>
        </div>

        {showEmojiPicker && (
          <div ref={emojiPickerRef}>
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              style={{
                position: 'absolute',
                bottom: '8rem',
                right: '4rem',
                zIndex: 2,
              }}
            />
          </div>
        )}
      </Form>
    </div>
  )
}

export default RightComponent
