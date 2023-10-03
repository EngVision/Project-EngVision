import React from 'react'
import { Avatar, Rate, Button, Input } from 'antd'
import Star from '../../../components/Icons/Star'
const { TextArea } = Input
const Reviews = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-2xl text-[#2769E7] mb-6">Reviews</h3>
      </div>
      <div className="mb-8">
        <div className="font-bold text-sm mb-2">Review this course</div>
        <TextArea
          className="mb-6"
          rows={3}
          showCount
          maxLength={500}
          placeholder="Write your review here"
        ></TextArea>
        <div className="flex items-center w-full justify-between">
          <Rate
            className="text-[#FD6267] mr-5"
            character={<Star width={24} height={24}></Star>}
            defaultValue={5}
          ></Rate>
          <Button type="primary" className="rounded-xl h-[2.5rem] w-[8rem]">
            Submit
          </Button>
        </div>
      </div>
      <div>
        <div className="border-dashed border-[1px] rounded-lg mb-10">
          <div className="flex p-4">
            <Avatar
              className="mr-3"
              size={64}
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            />
            <div>
              <div className="font-bold text-base mb-4">Minh Tri Nguyen</div>
              <div className="flex items-center mb-4">
                <Rate
                  disabled
                  className="text-[#FD6267] mr-5"
                  character={<Star width={18} height={18}></Star>}
                  value={4}
                ></Rate>
                <span className="text-xs font-bold">3 days ago</span>
              </div>
              <p className="text-sm">
                I recently completed the B2 Starter Course, and I must say it
                was an exceptional learning experience. The course is
                well-structured, comprehensive, and highly engaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
