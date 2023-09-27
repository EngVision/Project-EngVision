import { Breadcrumb, Button, Checkbox, Input } from 'antd'
import React from 'react'

import { BarsIcon } from '../../components/Icons'

const MakeSentences = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <a href="/" className="text-[28px] font-semibold">
                ...
              </a>
            ),
          },
          {
            title: (
              <a href="/" className="text-[28px] font-semibold">
                Lesson 1
              </a>
            ),
          },
          {
            title: (
              <span className="text-[28px] font-semibold">
                Homework title 1
              </span>
            ),
          },
        ]}
        separator={<span className="text-[28px] font-semibold">/</span>}
        className="mt-[32px]"
      />

      <div className="mt-8">
        <h3 className="text-[24px]">General</h3>
        <div className="flex flex-col gap-6 mt-4">
          <div className="flex gap-3">
            <Input placeholder="Make sentences" className="rounded-[8px]" />
            <Input placeholder="Exercise title 1" className="rounded-[8px]" />
            <Input placeholder="Description" className="rounded-[8px]" />
            <Input placeholder="Deadline" className="rounded-[8px]" />
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Default tags (Optional)"
              className="rounded-[8px]"
            />
            <Input
              placeholder="Default levels (Optional)"
              className="rounded-[8px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between">
          <h3 className="text-[24px]">Exercise Content</h3>
          <Button type="primary">Add new</Button>
        </div>

        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col gap-2">
            <p className="text-[16px]">
              Use <b>"[option 1|option 2|option 3]"</b> to represent a question.
              Use <b>"*"</b> to mark the correct option.
            </p>

            <p className="text-[16px]">
              Example: <b>[red|blue|*green]</b> is the <b>[*color|smell]</b> of
              the leaf.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <Input placeholder="Question 1" className="rounded-[8px]" />
            <Input placeholder="Image" className="rounded-[8px]" />
            <Input placeholder="Tags" className="rounded-[8px]" />
            <Input placeholder="Levels" className="rounded-[8px]" />

            <Checkbox>Strict</Checkbox>

            <BarsIcon />
          </div>

          <div className="flex justify-between">
            <div className="flex gap-4">
              <Button type="primary" danger>
                Delete
              </Button>
              <Button className="border-primary text-primary">Cancel</Button>
            </div>

            <Button type="primary">Save and publish</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakeSentences
