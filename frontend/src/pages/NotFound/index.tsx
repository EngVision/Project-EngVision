import React from 'react'
import { NotFoundImage } from '../../components/Icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col-reverse lg:!flex-row h-screen justify-center items-center gap-[5%] bg-bgDefault p-6">
      <div className="flex flex-col w-[520px]">
        <p className="font-bold text-[32px] mb-4 text-dark">
          Oops, something went wrong!
        </p>
        <p className="font-semibold text-2xl mb-4 text-dark">
          We can’t find the page you are looking for
        </p>
        <p className="text-textSubtle mb-4 text-sm">
          It could be the page is no longer available or has been moved to a new
          address. You can try another URL or visit our homepage.
        </p>
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate('')
            }}
          >
            Homepage
          </Button>
        </div>
      </div>
      <NotFoundImage width={400} height={400} />
    </div>
  )
}

export default NotFound
