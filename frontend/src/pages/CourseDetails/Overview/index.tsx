import React from 'react'
import VideoPlay from '../../../components/Icons/VideoPlay'
import PlayCircle from '../../../components/Icons/PlayCircle'
import { Tag } from 'antd'
const Overview = () => {
  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl text-[#2769E7] mb-6">General</h3>
        <div className="flex text-base font-light">
          <div className="flex items-center  mr-12">
            <VideoPlay className="mr-3" />
            <div>10 lessons</div>
          </div>
          <div className="flex items-center ">
            <PlayCircle className="mr-3" />
            <div>25 hr 3 min</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-base mb-2">Description</h4>
        <div className="border-solid border-[1px] border-[#D3D3D3] py-2 px-4 rounded-lg">
          Boost your English public speaking and presentation skills with
          confidence.Boost your English public speaking and presentation skills
          with confidence.
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-base mb-2">Description</h4>
        <div className="border-solid border-[1px] border-[#D3D3D3] py-2 px-4 rounded-lg">
          Boost your English public speaking and presentation skills with
          confidence.Boost your English public speaking and presentation skills
          with confidence.
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-base mb-2">Level</h4>
        <Tag className="px-10 py-2 text-base font-bold" color="#41AB3F">
          A1
        </Tag>
      </div>
    </div>
  )
}

export default Overview