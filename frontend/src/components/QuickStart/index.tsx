import React, { useEffect, useState } from 'react'
import { Button, Collapse } from 'antd'
import type { CollapseProps } from 'antd'
import { CloseCircleWhiteIcon } from '../Icons'
import TickCircle from '../Icons/TickCircle'
import Bulb from '../Icons/Bulb'
import { useNavigate } from 'react-router-dom'
import { ICheckListItem } from '../../services/checkListApi/types'
import checkListApi from '../../services/checkListApi'

const QuickStart = ({
  checkListItems,
}: {
  checkListItems: ICheckListItem[]
}) => {
  const [isHidden, setIsHidden] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const toggleQuickStart = () => {
    setIsHidden(!isHidden)
  }

  useEffect(() => {
    let index = 0

    checkListItems.forEach((item, i) => {
      if (item.isDone) {
        index = i + 1
      }
    })

    setActiveIndex(index)
  }, [checkListItems])

  const navigation = useNavigate()
  const items: CollapseProps['items'] = checkListItems?.map((item, index) => {
    return {
      key: index,
      label: (
        <div className="flex items-center">
          <TickCircle
            className={`mr-2 ${
              item?.isDone ? 'text-alternative' : 'text-grey-300'
            }`}
            width={24}
            height={24}
          />
          <div className="font-bold">{item?.title}</div>
        </div>
      ),
      children: (
        <div className="">
          <p className="mb-4">{item?.description}</p>
          <Button type="primary" onClick={() => navigation(item.link)}>
            Show me
          </Button>
        </div>
      ),
    }
  })
  const dismissQuickStart = async () => {
    checkListItems = (await checkListApi.dismiss())?.items ?? []
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
          activeKey={activeIndex}
        />
        <div className="flex justify-center">
          <Button type="text" onClick={dismissQuickStart}>
            Dismiss QuickStart
          </Button>
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
