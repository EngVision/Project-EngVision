import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import SpeakingSettings from './SpeakingSettings'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

type NewQuestionFormProps = {
  index: number
}

const NewQuestionForm = ({ index }: NewQuestionFormProps) => {
  const form = Form.useFormInstance()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="relative">
        <Form.Item
          className="flex-1"
          label="Question"
          name={[index, 'questionText']}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            className="h-full"
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder="Question"
          />
        </Form.Item>
        <div
          className="font-semibold text-primary hover:cursor-pointer absolute right-4 top-[36px] p-2"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </div>
      </div>

      <Modal
        title={<h4 className="text-xl">Question {index + 1}</h4>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className="min-w-[800px]"
        footer={() => (
          <>
            <Button type="primary" onClick={handleOk}>
              Confirm
            </Button>
          </>
        )}
      >
        <div className="flex gap-4 mt-6 min-h-[400px]">
          <div className="w-[400px] flex flex-col gap-2">
            <h4 className="text-sm uppercase text-wolfGrey">Contents</h4>

            <Form.Item name={[index, 'text']}>
              <CKEditor
                editor={ClassicEditor}
                data={form.getFieldValue(['content', index, 'text'])}
                onReady={(editor) => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      'height',
                      '200px',
                      editor.editing.view.document.getRoot()!,
                    )
                  })
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  form.setFieldValue(['content', index, 'text'], data)
                }}
              />
            </Form.Item>
          </div>

          <SpeakingSettings index={index} />
        </div>
      </Modal>
    </>
  )
}

export default NewQuestionForm
