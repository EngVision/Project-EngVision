import React, { useState } from 'react'
import { useEffect } from 'react'
import { chatApi } from '../../services/chatApi'
import { useAppSelector } from '../../hooks/redux'

interface UserData {
  username: string
  name: string
  pass: string
  email: string
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(0)

  const handleChatClick = (index: number) => {
    setSelectedChat(index)
  }

  const registerUser = async () => {
    const userData = {
      username: 'testdocker1',
      name: 'dt1',
      pass: 'Leconghuu17.',
      email: 'leconghuu.chl1@email.com',
    }

    const registrationResult = await chatApi.registerUser(userData)
    console.log('Registration Result:', registrationResult)

    // Check if the email already exists
    // const emailExists = await chatApi.checkEmailExists(userData)

    // if (!emailExists) {
    //   try {
    //     const registrationResult = await chatApi.registerUser(userData)
    //     console.log('Registration Result:', registrationResult)
    //   } catch (error) {
    //     console.error('Error during registration:', error)
    //   }
    // } else {
    //   console.log('Email already exists. Skipping registration.')
    // }
  }

  const loginUser = async () => {
    const loginData = {
      user: 'testdocker1',
      password: {
        digest:
          'a929cdf3bcf4e67f7dc0d9de99eeab69510f1daac755e451b127632be505f69b',
        algorithm: 'sha-256',
      },
    }

    try {
      const loginResult = await chatApi.login(loginData)
      console.log('Login Result:', loginResult)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  loginUser()

  // useEffect(() => {
  //   registerUser()
  //   // loginUser()
  // }, [])

  // const chatPreview = dataPreview.map((item, index) => {
  //   const isSelected = index === selectedChat
  //   const chatClass = `flex items-center p-2 my-2 border-b border-gray-200 ${
  //     isSelected ? 'bg-blue-100 rounded-xl' : ''
  //   }`
  //   return (
  //     <div
  //       className={chatClass}
  //       key={index}
  //       onClick={() => handleChatClick(index)}
  //     >
  //       <img
  //         className="w-10 h-10 rounded-full"
  //         src={item.avatar}
  //         alt="Kang's profile"
  //       />
  //       <div className="ml-2">
  //         <h4 className="font-bold">{item.name}</h4>
  //         <p className="text-sm text-gray-500">{item.message}</p>
  //       </div>
  //       <span className="ml-auto text-sm text-gray-500">{item.time}</span>
  //     </div>
  //   )
  // })
  // // Component for the left side
  // const LeftComponent = () => {
  //   return (
  //     <div className="flex flex-col w-1/3 border-r border-gray-200 bg-surface p-5 rounded-xl">
  //       <h1 className="text-2xl font-bold text-blue-700 mb-2">Chats</h1>
  //       {/* Search bar */}
  //       <input
  //         className="p-2 border-solid border-2 border-blue-500 rounded-xl mb-2"
  //         type="text"
  //         placeholder="Search"
  //       />

  //       {/* Chat preview */}
  //       {chatPreview}
  //     </div>
  //   )
  // }

  // // Component for the right side
  // const RightComponent = () => {
  //   return (
  //     <div className="flex flex-col w-2/3 bg-surface ml-5 px-5 rounded-xl">
  //       {/* Chat messages */}
  //       <div className="flex flex-col p-2">
  //         <div className="flex flex-row justify-between  border-solid border-b border-0 border-gray-300">
  //           <div className="flex flex-row items-center">
  //             <img
  //               className="w-10 h-10 rounded-full"
  //               src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  //               alt="Kang's profile"
  //             />
  //             <div className="flex flex-col p-2">
  //               <h4 className="font-bold">Kang</h4>
  //               <span className="text-sm text-gray-500">Now</span>
  //             </div>
  //           </div>

  //           {/* Call Icon */}
  //           <div className="ml-4 flex items-center">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               className="w-6 h-6 text-blue-500 cursor-pointer"
  //               fill="none"
  //               viewBox="0 0 24 24"
  //               stroke="currentColor"
  //             >
  //               <path
  //                 d="M6.9 20.6C8.4 21.5 10.2 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.3 17L2.44044 20.306C2.24572 21.0549 2.93892 21.7317 3.68299 21.5191L6.9 20.6Z"
  //                 stroke="#3A3A3A"
  //                 stroke-width="1.5"
  //                 stroke-miterlimit="10"
  //                 stroke-linecap="round"
  //                 stroke-linejoin="round"
  //               />
  //               <path
  //                 d="M16.5 14.8485C16.5 15.0105 16.4639 15.177 16.3873 15.339C16.3107 15.501 16.2116 15.654 16.0809 15.798C15.86 16.041 15.6167 16.2165 15.3418 16.329C15.0714 16.4415 14.7784 16.5 14.4629 16.5C14.0033 16.5 13.512 16.392 12.9937 16.1715C12.4755 15.951 11.9572 15.654 11.4434 15.2805C10.9251 14.9025 10.4339 14.484 9.9652 14.0205C9.501 13.5525 9.08187 13.062 8.70781 12.549C8.33826 12.036 8.04081 11.523 7.82449 11.0145C7.60816 10.5015 7.5 10.011 7.5 9.543C7.5 9.237 7.55408 8.9445 7.66224 8.6745C7.77041 8.4 7.94166 8.148 8.18052 7.923C8.46895 7.6395 8.78443 7.5 9.11793 7.5C9.24412 7.5 9.37031 7.527 9.48297 7.581C9.60015 7.635 9.70381 7.716 9.78493 7.833L10.8305 9.3045C10.9116 9.417 10.9702 9.5205 11.0108 9.6195C11.0513 9.714 11.0739 9.8085 11.0739 9.894C11.0739 10.002 11.0423 10.11 10.9792 10.2135C10.9206 10.317 10.835 10.425 10.7268 10.533L10.3843 10.8885C10.3348 10.938 10.3122 10.9965 10.3122 11.0685C10.3122 11.1045 10.3167 11.136 10.3257 11.172C10.3393 11.208 10.3528 11.235 10.3618 11.262C10.4429 11.4105 10.5826 11.604 10.7809 11.838C10.9837 12.072 11.2 12.3105 11.4344 12.549C11.6778 12.7875 11.9121 13.008 12.151 13.2105C12.3853 13.4085 12.5791 13.5435 12.7323 13.6245C12.7549 13.6335 12.7819 13.647 12.8135 13.6605C12.8495 13.674 12.8856 13.6785 12.9261 13.6785C13.0028 13.6785 13.0613 13.6515 13.1109 13.602L13.4534 13.2645C13.5661 13.152 13.6743 13.0665 13.7779 13.0125C13.8816 12.9495 13.9852 12.918 14.0979 12.918C14.1835 12.918 14.2737 12.936 14.3728 12.9765C14.472 13.017 14.5756 13.0755 14.6883 13.152L16.18 14.2095C16.2972 14.2905 16.3783 14.385 16.4279 14.4975C16.473 14.61 16.5 14.7225 16.5 14.8485Z"
  //                 stroke="#3A3A3A"
  //                 stroke-width="1.5"
  //                 stroke-miterlimit="10"
  //               />
  //             </svg>
  //           </div>
  //         </div>

  //         {/* Chat messages */}
  //         <div className="flex flex-col p-2 border-b border-gray-200 mt-2">
  //           {/* Individual Chat Message */}
  //           <div className="flex items-center">
  //             {/* Avatar and User Info */}
  //             <div className="flex mr-3">
  //               <img
  //                 className="w-10 h-10 rounded-full"
  //                 src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  //                 alt="Kang's profile"
  //               />
  //             </div>
  //             {/* Message Content */}
  //             <div className="rounded-md">
  //               <h4 className="font-bold">Kang</h4>
  //               <div className=" border-solid border-2 border-sky-500 bg-white rounded-lg p-1">
  //                 <p className="text-sm text-gray-500">
  //                   Hey Mike! I graded your exercises. You have some grammar
  //                   errors.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           {/* Individual Chat Message */}
  //           <div className="flex items-center justify-end">
  //             {/* Message Content */}
  //             <div className="rounded-md text-right">
  //               <h4 className="font-bold">Me</h4>
  //               <div className="border-solid border-2 border-blue-500 bg-blue-500 rounded-lg p-1">
  //                 <p className="text-sm text-white">
  //                   Hi Kang! Thanks for your feedback. I'll review and make the
  //                   necessary corrections.
  //                 </p>
  //               </div>
  //             </div>
  //             {/* Avatar and User Info */}
  //             <div className="flex ml-3">
  //               <img
  //                 className="w-10 h-10 rounded-full"
  //                 src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  //                 alt="Your profile"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Add more chat messages as needed */}

  //       {/* Text input field */}
  //       <div className="mt-auto p-2 mb-1 border-t border-gray-200 flex items-center">
  //         <input
  //           className="w-full p-2 rounded-lg border-solid border-2 border-blue-500"
  //           type="text"
  //           placeholder="Your messages..."
  //         />
  //         <button className="ml-2 p-1 bg-surface rounded">
  //           <svg
  //             width="24"
  //             height="24"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <g clip-path="url(#clip0_3550_13330)">
  //               <path
  //                 d="M4.219 19.2698C4.08752 19.874 4.55138 20.1297 4.98178 19.9367L19.5283 12.4778H19.5298C19.7033 12.38 19.804 12.2036 19.804 12.0002C19.804 11.7966 19.7033 11.6201 19.5298 11.5223H19.5283L4.98178 4.06328C4.55138 3.87028 4.08752 4.12611 4.219 4.7303C4.22789 4.77122 5.08787 8.60191 5.55544 10.6853L13.149 12.0001L5.55544 13.3148C5.08787 15.3981 4.22785 19.2288 4.219 19.2698Z"
  //                 fill="#4299e1"
  //               />
  //             </g>
  //             <defs>
  //               <clipPath id="clip0_3550_13330">
  //                 <rect
  //                   width="16"
  //                   height="16"
  //                   fill="white"
  //                   transform="translate(4 4)"
  //                 />
  //               </clipPath>
  //             </defs>
  //           </svg>
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="h-full">
      {/* <div className="flex h-[100%]">
        <LeftComponent />
        <RightComponent />
      </div> */}
    </div>
  )
}

export default Chat
