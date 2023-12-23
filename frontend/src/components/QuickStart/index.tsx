import React, { useState } from 'react'
import { Button, Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import { CloseCircleWhiteIcon } from '../Icons'
import TickCircle from '../Icons/TickCircle'
import Bulb from '../Icons/Bulb'

const text = `
Ready to unleash your inner wordsmith? Our Quick Start guide is your launchpad to English fluency. Dive into essential features like building your vocabulary, mastering everyday phrases, and conquering tricky grammar points. 
`

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (
      <div className="flex items-center">
        <TickCircle className="mr-2 text-alternative" width={24} height={24} />
        <div className="font-bold ">Getting Started Items</div>
      </div>
    ),
    children: (
      <div className="">
        <p className="mb-4 ">{text}</p>
        <Button type="primary">Show me</Button>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div className="flex items-center">
        <TickCircle className="mr-2 text-alternative" width={24} height={24} />
        <div className="font-bold">Getting Started Items</div>
      </div>
    ),
    children: (
      <div className="">
        <p className="mb-4">{text}</p>
        <Button type="primary">Show me</Button>
      </div>
    ),
  },
  {
    key: '3',
    label: (
      <div className="flex items-center">
        <TickCircle className="mr-2 text-grey-300" width={24} height={24} />
        <div className="font-bold">Getting Started Items</div>
      </div>
    ),
    children: (
      <div className="">
        <p className="mb-4">{text}</p>
        <Button type="primary">Show me</Button>
      </div>
    ),
  },
]
const QuickStart = () => {
  const [isHidden, setIsHidden] = useState(true)
  const toggleQuickStart = () => {
    setIsHidden(!isHidden)
  }
  return (
    <div className="fixed bottom-14 right-14 w-[20rem] transition-all">
      <div
        className={`${
          isHidden ? 'hidden' : ''
        } rounded-xl overflow-hidden mb-4 bg-surface`}
      >
        <div className="flex items-center justify-between bg-primary px-4 py-4">
          <div className="font-bold text-base text-white">
            EngVision Quick Start
          </div>
          <div
            className="cursor-pointer flex items-center"
            onClick={toggleQuickStart}
          >
            <CloseCircleWhiteIcon />
          </div>
        </div>
        <Collapse
          accordion={true}
          bordered={false}
          className=""
          expandIconPosition="end"
          items={items}
          defaultActiveKey={['1']}
        />
        <div className="flex justify-center">
          <Button type="text">Dismiss QuickStart</Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className="flex gap-2 items-center py-4 rounded-2xl"
          type="primary"
          onClick={toggleQuickStart}
        >
          <Bulb></Bulb>
          QuickStart
        </Button>
      </div>
    </div>
  )
}

export default QuickStart
