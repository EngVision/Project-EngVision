import { Button, Checkbox, Col, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { ArrowDownIcon } from '../../../../components/Icons'

type onChangeType = (selection: string[]) => void

interface DropdownCheckboxProps {
  options: string[]
  value: string[]
  label: string
  onChange: onChangeType
}

const DropdownCheckbox = ({
  options,
  onChange,
  value,
  label,
}: DropdownCheckboxProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  useEffect(() => {
    if (value && value.length) {
      setSelectedItems([...value])
    }
  }, [value])

  const onLocalChange: any = (selection: string[]) => {
    setSelectedItems([...selection])
    onChange(selection)
  }

  const CheckboxRender = () => {
    return (
      <Checkbox.Group onChange={onLocalChange} value={selectedItems}>
        <Col className="flex flex-col min-w-[200px] py-2">
          {options.map((label) => {
            return (
              <Checkbox
                key={label}
                value={label}
                className="hover:bg-grey-100 px-4 py-2"
              >
                {label}
              </Checkbox>
            )
          })}
        </Col>
      </Checkbox.Group>
    )
  }

  return (
    <Popover
      content={<CheckboxRender />}
      trigger="click"
      placement="bottomLeft"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button
        className={`w-fit flex items-center gap-2 
        ${open ? 'text-primary border-primary' : ''}`}
      >
        <span>{label}</span>
        <ArrowDownIcon width={16} height={16} />
      </Button>
    </Popover>
  )
}

export default DropdownCheckbox
