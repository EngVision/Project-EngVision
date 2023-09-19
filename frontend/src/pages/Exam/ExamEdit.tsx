import {
  faChartSimple,
  faEllipsisVertical,
  faEraser,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Checkbox, Input, Popover } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

export const ExamEdit = () => {
  const popover = (
    <div className="flex flex-col items-start">
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faChartSimple} />
        Statistics
      </Button>
      <Button href="./exam-edit" type="text">
        <FontAwesomeIcon className="mr-1" icon={faNoteSticky} />
        Edit
      </Button>
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faEraser} />
        Remove
      </Button>
    </div>
  )

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }
  return (
    <>
      <div className="m-12">
        <p className="text-2xl font-bold">
          Your courses / CEFR / Section 1 / Lession 1 / Homework Title 1
        </p>
        <div className="my-6 text-lg font-semibold">
          <p className="mb-3">General</p>
          <div className="grid grid-cols-3 gap-4">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Homework Type"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Description"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Deadline"
            />
          </div>
        </div>
        <div className="my-6 text-lg font-semibold">
          <div className="flex justify-between">
            <p className="mb-3">Homework Content</p>
            <Button type="primary">Add new</Button>
          </div>
          <p className="text-sm font-medium">
            You can use "[[]]" to help EngVision automatically create a blank
            placeholder for you. If it is not provided, it will be default blank
            after the question. Example: "How [[]] you?"
          </p>
          <div className="grid grid-cols-8 gap-1 my-5">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Question 1"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Image (optional)"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Answer"
            />
            <Checkbox className="col-span-1 items-center" onChange={onChange}>
              strict
            </Checkbox>
            <Popover
              content={popover}
              trigger="click"
              className="text-black hover:text-slate-400 col-span-1"
            >
              <Button type="text">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </Popover>
          </div>
          <div className="grid grid-cols-8 gap-1 my-5">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Question 2"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Image (optional)"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Answer"
            />
            <Checkbox className="col-span-1 items-center" onChange={onChange}>
              strict
            </Checkbox>
            <Popover
              content={popover}
              trigger="click"
              className="text-black hover:text-slate-400 col-span-1"
            >
              <Button type="text">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </Popover>
          </div>
          <div className="grid grid-cols-8 gap-1 my-5">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Question 3"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Image (optional)"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
              placeholder="Answer"
            />
            <Checkbox className="col-span-1 items-center" onChange={onChange}>
              strict
            </Checkbox>
            <Popover
              content={popover}
              trigger="click"
              className="text-black hover:text-slate-400 col-span-1"
            >
              <Button type="text">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    </>
  )
}
