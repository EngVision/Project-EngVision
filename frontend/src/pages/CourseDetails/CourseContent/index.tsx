import React from 'react'
import { Collapse } from 'antd'
import TickCircle from '../../../components/Icons/TickCircle'
import Circle from '../../../components/Icons/Circle'
const { Panel } = Collapse
const CourseContent = (course: any) => {
  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl text-[#2769E7] mb-6">Course Content</h3>
      </div>
      <div>
        {course.course.sections &&
          course.course.sections.map((section: any) => (
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
                      <div className="text-2xl mr-2">
                        Section {section.sectionNumber} :
                      </div>
                      <span className="text-xl font-bold">{section.title}</span>
                    </div>
                  }
                  key="1"
                >
                  <div className="">
                    {section.lessons &&
                      section.lessons.map((lesson: any) => (
                        <div className="ml-8 mb-4 flex items-center cursor-pointer ">
                          <Circle className="mr-2" width={30} height={30} />
                          <div className="font-bold text-lg">
                            {lesson.title}
                          </div>
                        </div>
                      ))}
                  </div>
                </Panel>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CourseContent
