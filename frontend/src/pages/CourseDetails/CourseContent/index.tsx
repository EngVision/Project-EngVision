import React from 'react'
import { Collapse } from 'antd'
import TickCircle from '../../../components/Icons/TickCircle'
import Circle from '../../../components/Icons/Circle'
const { Panel } = Collapse
const CourseContent = () => {
  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl text-[#2769E7] mb-6">Course Content</h3>
      </div>
      <div>
        <div className="border-dashed border-[1px] rounded-lg ">
          <Collapse
            className="bg-[#FFFCF7]"
            accordion={true} // Set accordion for each panel
            bordered={false} // Remove borders if desired
            expandIconPosition="end"
            onChange={() => {}} // Custom function when panel is expanded/collapsed
          >
            <Panel
              header={
                <div className="flex items-center">
                  <TickCircle className="mr-2" width={30} height={30} />
                  <div className="text-2xl mr-2">Section 01:</div>
                  <span className="text-sm font-bold">Section name</span>
                </div>
              }
              key="1"
            >
              <div className="">
                <div className="ml-8 mb-4 flex items-center cursor-pointer ">
                  <Circle className="mr-2" width={30} height={30} />
                  <div className="font-bold text-lg">Lecture name</div>
                </div>
                <div className="ml-8 flex items-center cursor-pointer">
                  <Circle className="mr-2" width={30} height={30} />
                  <div className="font-bold text-lg">Lecture name</div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default CourseContent
