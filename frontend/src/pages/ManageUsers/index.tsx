import { Button, Dropdown, MenuProps, Space, Tag } from 'antd'
import { MoreVerticalIcon } from '../../components/Icons'
import { Level } from '../../utils/constants'
import { useState } from 'react'

interface DataType {
  id: string
  name: string
  email: string
  role: string
  level: string
  createDate: string
  status: string
}

const Status = {
  Pending: 'Pending',
  Active: 'Active',
  Locked: 'Locked',
}

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    email: 'duytan123@gmail.com',
    role: 'Teacher',
    level: 'C1',
    createDate: '1-1-2015',
    status: 'Pending',
  },
  {
    id: '2',
    name: 'John Brown 123',
    email: 'duytan123@gmail.com',
    role: 'Teacher',
    level: 'A1',
    createDate: '1-1-2015',
    status: 'Active',
  },
  {
    id: '3',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '4',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '5',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '6',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '7',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '8',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
  {
    id: '9',
    name: 'John Brown 111111',
    email: 'duytan123@gmail.com',
    role: 'Student',
    level: 'B1',
    createDate: '1-1-2015',
    status: 'Locked',
  },
]

const Actions = {
  Approve: 'Approve',
  Reject: 'Reject',
  Lock: 'Lock',
  Unlock: 'Unlock',
}

const ManageUsers = () => {
  const [status, setStatus] = useState(Status.Pending)

  const handleAction = (action: string, userId: string) => {
    console.log(action, userId)
  }

  const dataFilter = data.filter((user) => user.status === status)

  return (
    <>
      <p className="font-bold text-3xl text-blue-600">Users Management</p>
      <div className="flex justify-between mt-6 mb-3">
        <Space>
          <Button
            className={` ${
              status === Status.Pending
                ? '!text-[#F3F8FF] !bg-lime-500 !border-lime-500'
                : 'bg-transparent text-[#41AB3F] border-[#41AB3F] hover:!text-lime-500 hover:!border-lime-500'
            }`}
            onClick={() => setStatus('Pending')}
          >
            Pending
          </Button>
          <Button
            type="primary"
            ghost
            className={`${
              status === Status.Active
                ? '!text-[#F3F8FF] !bg-[#1677FF] !border-[#1677FF]'
                : ''
            }`}
            onClick={() => setStatus('Active')}
          >
            Active
          </Button>
          <Button
            type="primary"
            danger
            ghost
            className={`${
              status === Status.Locked
                ? '!text-[#F3F8FF] !bg-[#ff4d4f] !border-[#ff4d4f]'
                : ''
            }`}
            onClick={() => setStatus('Locked')}
          >
            Locked
          </Button>
        </Space>
        <Space>
          <Button type="primary" ghost>
            Filter
          </Button>
          <Button type="primary" ghost>
            Sort
          </Button>
        </Space>
      </div>
      <div>
        <table className="w-full text-center border-separate  border-spacing-y-[10px]">
          <thead>
            <tr>
              <th className="!font-semibold">Name</th>
              <th className="!font-semibold">Email</th>
              <th className="!font-semibold">Role</th>
              <th className="!font-semibold">Level</th>
              <th className="!font-semibold">Create Date</th>
              <th className="!font-semibold">Status</th>
              <th className="!font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter.map((user) => (
              <tr
                key={user.id}
                className="text-[#706E68] text-[14px] bg-[#FFFCF7]"
              >
                <td className="p-[12px] rounded-l-md">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Tag
                    className={`${Level.find(
                      (level) => level.level === user.level,
                    )?.color} text-[#706E68] px-[10px]`}
                  >
                    {user.level}
                  </Tag>
                </td>
                <td>{user.createDate}</td>
                <td>
                  <div
                    className={`border-[1px] border-solid border-[#706E68] py-[2px] px-[4px] rounded-[5px] ${
                      user.status === Status.Pending
                        ? 'text-[#41AB3F] !border-[#41AB3F]'
                        : user.status === Status.Active
                        ? 'text-[#1677FF] !border-[#1677FF]'
                        : 'text-[#ff4d4f] !border-[#ff4d4f]'
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td>
                  <Dropdown
                    menu={
                      {
                        items: [
                          user.status === Status.Pending && {
                            key: '1',
                            label: (
                              <p
                                onClick={() =>
                                  handleAction(Actions.Approve, user.id)
                                }
                                role="presentation"
                              >
                                {Actions.Approve}
                              </p>
                            ),
                          },
                          user.status === Status.Pending && {
                            key: '2',
                            label: (
                              <p
                                onClick={() =>
                                  handleAction(Actions.Reject, user.id)
                                }
                                role="presentation"
                              >
                                {Actions.Reject}
                              </p>
                            ),
                          },
                          user.status === Status.Locked && {
                            key: '3',
                            label: (
                              <p
                                onClick={() =>
                                  handleAction(Actions.Unlock, user.id)
                                }
                                role="presentation"
                              >
                                {Actions.Unlock}
                              </p>
                            ),
                          },
                          user.status === Status.Active && {
                            key: '4',
                            label: (
                              <p
                                onClick={() =>
                                  handleAction(Actions.Lock, user.id)
                                }
                                role="presentation"
                              >
                                {Actions.Lock}
                              </p>
                            ),
                          },
                        ] as MenuProps['items'],
                      } as MenuProps
                    }
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <div className="flex align-middle justify-center">
                      <MoreVerticalIcon
                        width={20}
                        height={20}
                        className="cursor-pointer"
                      />
                    </div>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div>
        <div className="modalContent">
          <iframe
            className="h-[200px] w-full"
            src="http://www.africau.edu/images/default/sample.pdf"
          ></iframe>
        </div>
      </div> */}
    </>
  )
}

export default ManageUsers
