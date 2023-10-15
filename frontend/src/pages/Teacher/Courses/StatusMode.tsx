import { Button, Dropdown } from 'antd'
import { ArrowDownIcon } from '../../../components/Icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCourseStatus } from '../../../redux/course/slice'
import { COURSE_STATUS } from '../../../utils/constants'

const StatusMode = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.course.status)

  const items = [
    {
      key: COURSE_STATUS.all,
      label: 'All',
    },
    {
      key: COURSE_STATUS.published,
      label: 'Published',
    },
    {
      key: COURSE_STATUS.draft,
      label: 'Draft',
    },
  ]

  const handleClickItem = ({ key }: any) => {
    dispatch(setCourseStatus(key))
  }

  return (
    <div>
      <div className="hidden lg:flex gap-4">
        <Button
          type={status === COURSE_STATUS.all ? 'primary' : 'default'}
          className={
            status === COURSE_STATUS.all ? '' : 'border-primary text-primary'
          }
          onClick={() => {
            dispatch(setCourseStatus(COURSE_STATUS.all))
          }}
        >
          All
        </Button>
        <Button
          type={status === COURSE_STATUS.published ? 'primary' : 'default'}
          className={
            status === COURSE_STATUS.published
              ? ''
              : 'border-primary text-primary'
          }
          onClick={() => {
            dispatch(setCourseStatus(COURSE_STATUS.published))
          }}
        >
          Published
        </Button>
        <Button
          type={status === COURSE_STATUS.draft ? 'primary' : 'default'}
          className={
            status === COURSE_STATUS.draft ? '' : 'border-primary text-primary'
          }
          onClick={() => {
            dispatch(setCourseStatus(COURSE_STATUS.draft))
          }}
        >
          Draft
        </Button>
      </div>

      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['3'],
          onClick: handleClickItem,
        }}
        className="lg:hidden"
      >
        <Button type="primary" className="flex items-center gap-2">
          <span>{items.find((i) => i.key === status)?.label}</span>
          <ArrowDownIcon width={16} height={16} />
        </Button>
      </Dropdown>
    </div>
  )
}

export default StatusMode
