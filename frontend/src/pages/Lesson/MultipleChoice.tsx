// import {
//   faChartSimple,
//   faEllipsisVertical,
//   faEraser,
//   faNoteSticky,
// } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Checkbox, Input, Popover } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'

const MultipleChoice = () => {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const popover = (
    <div className="flex flex-col items-start">
      <Button type="text">Statistics</Button>

      <Button href="./exam-edit" type="text">
        Edit
      </Button>

      <Button type="text">Remove</Button>
    </div>
  )

  const question = (
    <div>
      <div className="grid grid-cols-8 gap-1 my-5">
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Question 1"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Tags"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Level"
        />
        <Checkbox className="col-span-1 items-center" onChange={onChange}>
          Random
        </Checkbox>
        <Popover
          content={popover}
          trigger="click"
          className="text-black hover:text-slate-400 col-span-1"
        >
          <Button type="text"></Button>
        </Popover>
      </div>
      <div className="grid grid-cols-5 gap-1 my-5">
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Answer 1"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Image 1"
        />
        <Checkbox className="col-span-1 items-center" onChange={onChange}>
          Correct Answer
        </Checkbox>
      </div>
      <div className="grid grid-cols-5 gap-1 my-5">
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Answer 2"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Image 2"
        />
        <Checkbox className="col-span-1 items-center" onChange={onChange}>
          Correct Answer
        </Checkbox>
      </div>
      <div className="grid grid-cols-5 gap-1 my-5">
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Answer 3"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Image 3"
        />
        <Checkbox className="col-span-1 items-center" onChange={onChange}>
          Correct Answer
        </Checkbox>
      </div>
      <div className="grid grid-cols-5 gap-1 my-5">
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Answer 4"
        />
        <Input
          className="border-slate-300 hover:border-slate-40 rounded-md col-span-2"
          placeholder="Image 4"
        />
        <Checkbox className="col-span-1 items-center" onChange={onChange}>
          Correct Answer
        </Checkbox>
      </div>
    </div>
  )

  return (
    <>
      <div className="m-12">
        <p className="text-2xl font-bold">
          Your courses / CEFR / Section 1 / Lession 1 / Homework Title 1
        </p>
        <div className="my-6 text-lg font-semibold">
          <p className="mb-3">General</p>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Make Sentences"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Exercise Title 1"
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Default Tags (Optional)"
            />
            <Input
              className="border-slate-300 hover:border-slate-40 rounded-md"
              placeholder="Default Level (Optional)"
            />
          </div>
        </div>
        <div className="my-6 text-lg font-semibold">
          <div className="flex justify-between">
            <p className="mb-3">Exercise Content</p>
            <Button type="primary">Add new</Button>
          </div>
          {/*---------------Question 1------------------*/}
          {question}
          {/*---------------Question 2------------------*/}
          {question}
          {/*---------------Button------------------*/}
          <div className="flex justify-between">
            <div className="grid grid-cols-2 gap-5">
              <Button type="primary" danger className="col-span-1">
                Delete
              </Button>
              <Button type="primary" ghost className="col-span-1">
                Cancel
              </Button>
            </div>
            <Button type="primary">Save and Publish</Button>
          </div>
        </div>
      </div>
    </>
  )
}
export default MultipleChoice
