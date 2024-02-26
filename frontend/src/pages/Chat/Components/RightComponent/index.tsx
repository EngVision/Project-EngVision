import { Button, Form, Input } from 'antd'
import Send from '../../../../components/Icons/Send'
import { useAppDispatch } from '../../../../hooks/redux'
import { setIsNewMessage } from '../../../../redux/app/slice'

const RightComponent = ({
  oppositeIndex,
  selectedChat,
  previewChats,
  directChats,
  handleSendMessage,
  formRef,
}: any) => {
  if (selectedChat === undefined) {
    console.log('No chat selected')
    return null
  }

  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    // Gửi tin nhắn khi nút gửi được nhấn
    sendMessage(values.value)
  }

  const sendMessage = (message: string) => {
    // Kiểm tra xem tin nhắn có rỗng không
    if (message.trim() === '') {
      return
    }

    handleSendMessage(message)
  }

  return (
    <div className="flex flex-col w-2/3 bg-surface ml-5 px-5 rounded-xl">
      {/* Chat messages */}
      <div className="flex flex-col p-2">
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
        <div className="overflow-y-auto flex-grow h-[27rem] flex flex-col-reverse">
          {/* Loop through and display direct messages */}
          {directChats.slice().map((message: any, index: any) => (
            <div
              key={index}
              className={`flex flex-col p-1 border-b border-gray-200 ${
                message.u.username !==
                previewChats[selectedChat].usernames[oppositeIndex]
                  ? 'items-end'
                  : 'items-start'
              }`}
            >
              <div className="flex">
                {/* Avatar and User Info */}
                <div
                  className={`flex ${
                    message.u.username !==
                    previewChats[selectedChat].usernames[oppositeIndex]
                      ? 'order-1'
                      : ''
                  }`}
                >
                  {/* Display Avatar Component or Image */}
                </div>

                {/* Individual Chat Message */}
                <div
                  className={`rounded-md ${
                    message.u.username !==
                    previewChats[selectedChat].usernames[oppositeIndex]
                      ? 'text-right'
                      : ''
                  }`}
                >
                  {message.u.username ===
                    previewChats[selectedChat].usernames[oppositeIndex] && (
                    <h4 className="text-[0.75rem] font-[400]">
                      {previewChats[selectedChat].oppositeName}
                    </h4>
                  )}
                  <div
                    className={`border-solid border-2 ${
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
          ))}
        </div>
      </div>

      {/* Text input send message */}
      <Form
        name="customForm"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: '100%' }}
        ref={formRef}
      >
        <div className="flex items-center p-2 border-t border-gray-200 w-[100%]">
          <Form.Item name="value" style={{ flex: 1, marginRight: '8px' }}>
            <Input
              id="messageInput"
              className="w-full p-2 rounded-lg border-solid border-2 border-blue-500"
              placeholder="Your messages..."
              onClick={() => dispatch(setIsNewMessage(false))}
            />
          </Form.Item>

          <Button
            className="mb-5 p-1 bg-surface rounded"
            type="primary"
            htmlType="submit"
          >
            <Send />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RightComponent