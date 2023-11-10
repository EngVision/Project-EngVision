import { SelectProps } from 'antd/es/select'

export default function enumToSelectOptions(
  enumType: object,
): SelectProps['options'] {
  return Object.values(enumType).map((v) => ({
    value: v,
    label: v.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
  }))
}
