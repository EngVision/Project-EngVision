import { Button, Dropdown, MenuProps, Space, Table, Tag, message } from 'antd'
import {
  ApproveIcon,
  LockIcon,
  MoreVerticalIcon,
  UnlockIcon,
} from '../../components/Icons'
import { LEVELS } from '../../utils/constants'
import { useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import accountApi from '../../services/accountApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AppLoading from '../../components/common/AppLoading'
import {
  GetAccountParams,
  ReasonBlock,
  UserAccount,
} from '../../services/accountApi/types'
import Filter from './Filter'
import Sort from './Sort'
import { Order } from '../../services/types'
import ModalConfirm from './ModalConfirm'
import { getFormattedDate } from '../../utils/common'

let firstLoad = true

const Status = {
  Pending: 'Pending',
  Active: 'Active',
  Blocked: 'Blocked',
}

const Actions = {
  Approve: 'Approve',
  Reject: 'Reject',
  Block: 'Block',
  Unblock: 'Unblock',
}

const ManageUsers = () => {
  const [status, setStatus] = useState(Status.Pending)
  const [role, setRole] = useState('All')
  const [sortByDate, setSortByDate] = useState('asc')
  const [page, setPage] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userSelected, setUserSelected] = useState<UserAccount>()
  const queryClient = useQueryClient()

  useEffect(() => {
    setPage(0)
  }, [status, role, sortByDate])

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['user', status, page, role, sortByDate],
    })
  }, [status, page, role, sortByDate])

  const getData = async () => {
    const params: GetAccountParams = {
      page,
      status,
      limit: 20,
    }
    if (role !== 'All') params.role = role
    if (sortByDate === Order.desc) {
      params.sortBy = 'createdAt'
      params.order = Order.desc
    }
    const res = await accountApi.getAccount(params)

    setTotalUser(res.total ? res.total : 0)

    const data: UserAccount[] = res.data
    const dataMap = data.map((user) => ({
      ...user,
      name: user.firstName + ' ' + user?.lastName,
    }))

    return dataMap
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current ? pagination.current - 1 : 0)
  }

  const { data: userList, isLoading: isLoading } = useQuery({
    queryKey: ['user', status, page, role, sortByDate],
    queryFn: () => getData(),
  })

  const approveMutation = useMutation({
    mutationFn: (id: string) => accountApi.approveAccount(id),
  })

  const unblockMutation = useMutation({
    mutationFn: (id: string) => accountApi.unblockAccount(id),
  })

  const blockMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: ReasonBlock }) =>
      accountApi.blockAccount(id, reason),
  })

  const blockUser = (userId: string, reason: ReasonBlock) => {
    blockMutation.mutate(
      { id: userId, reason },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user'] })
          message.open({
            key: 'submitMessage',
            content: 'Block successfully',
            type: 'success',
          })
        },
      },
    )
  }

  const handleAction = (action: string, userId: string) => {
    switch (action) {
      case Actions.Approve:
        approveMutation.mutate(userId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            message.open({
              key: 'submitMessage',
              content: 'Approve successfully',
              type: 'success',
            })
          },
        })
        break
      case Actions.Unblock:
        unblockMutation.mutate(userId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            message.open({
              key: 'submitMessage',
              content: 'Unblock successfully',
              type: 'success',
            })
          },
        })
        break
      default:
    }
  }

  const columns: ColumnsType<UserAccount> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Certificate',
      dataIndex: 'certificate',
      key: 'certificate',
      render: (certificate) => <a>{certificate ? certificate : 'PDF'}</a>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        level = level ? level : 'B1'
        return (
          <Tag
            className={`${LEVELS.find((lv) => lv.level === level)
              ?.color} text-white font-semibold px-[10px]`}
          >
            {level}
          </Tag>
        )
      },
    },
    {
      title: 'Create Date',
      dataIndex: 'createdAt',
      key: 'createDate',
      render: (date) => {
        return date ? getFormattedDate(date) : ''
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        return (
          <div className="flex justify-start align-middle">
            <div
              className={`border-[1px] border-solid py-[4px] px-[8px] rounded-[5px] ${
                status === Status.Pending
                  ? 'text-alternative !border-alternative'
                  : status === Status.Active
                  ? 'text-primary !border-primary'
                  : 'text-secondary !border-secondary'
              }`}
            >
              {status}
            </div>
          </div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: '100px',
      render: (_, user) => (
        <Dropdown
          menu={
            {
              items: [
                user.status === Status.Pending && {
                  key: '1',
                  label: (
                    <p
                      onClick={() => handleAction(Actions.Approve, user.id)}
                      role="presentation"
                      className="flex items-center"
                    >
                      <ApproveIcon width={20} height={20} className="mr-2" />
                      {Actions.Approve}
                    </p>
                  ),
                },
                user.status === Status.Pending && {
                  key: '2',
                  label: (
                    <p
                      onClick={() => handleAction(Actions.Reject, user.id)}
                      role="presentation"
                      className="flex items-center"
                    >
                      <LockIcon width={20} height={20} className="mr-2" />
                      {Actions.Reject}
                    </p>
                  ),
                },
                user.status === Status.Blocked && {
                  key: '3',
                  label: (
                    <p
                      onClick={() => handleAction(Actions.Unblock, user.id)}
                      role="presentation"
                      className="flex items-center"
                    >
                      <UnlockIcon width={20} height={20} className="mr-2" />
                      {Actions.Unblock}
                    </p>
                  ),
                },
                user.status === Status.Active && {
                  key: '4',
                  label: (
                    <p
                      onClick={() => {
                        setUserSelected(user)
                        setIsModalOpen(true)
                      }}
                      role="presentation"
                      className="flex items-center"
                    >
                      <LockIcon width={20} height={20} className="pr-1 mr-2" />
                      {Actions.Block}
                    </p>
                  ),
                },
              ] as MenuProps['items'],
            } as MenuProps
          }
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="pl-2">
            <MoreVerticalIcon
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </Dropdown>
      ),
    },
  ]

  if (isLoading && firstLoad) {
    firstLoad = false
    return <AppLoading />
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <p className="font-bold text-3xl text-blue-600">Users Management</p>
      <div className="flex justify-between mt-6 mb-6">
        <Space>
          <Button
            className={`
            ${
              status === Status.Pending
                ? '!text-white !bg-lime-500 !border-lime-500'
                : 'bg-transparent text-alternative border-alternative hover:!text-lime-500 hover:!border-lime-500'
            }`}
            onClick={() => setStatus(Status.Pending)}
          >
            Pending
          </Button>
          <Button
            type="primary"
            ghost
            className={`${
              status === Status.Active
                ? '!text-white !bg-primary !border-primary'
                : ''
            }`}
            onClick={() => setStatus(Status.Active)}
          >
            Active
          </Button>
          <Button
            type="primary"
            danger
            ghost
            className={`${
              status === Status.Blocked
                ? '!text-white !bg-secondary !border-secondary'
                : ''
            }`}
            onClick={() => setStatus(Status.Blocked)}
          >
            Locked
          </Button>
        </Space>
        <Space>
          <Filter setRole={setRole} />
          <Sort setRole={setSortByDate} />
        </Space>
      </div>
      <ModalConfirm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={userSelected}
        blockUserFunc={blockUser}
      />
      <Table
        loading={
          (isLoading && !firstLoad) ||
          approveMutation.isPending ||
          blockMutation.isPending ||
          unblockMutation.isPending
        }
        columns={columns}
        rowKey="id"
        dataSource={userList}
        pagination={{
          current: page + 1,
          pageSize: 20,
          total: totalUser,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        scroll={{ y: 'calc(100vh - 401px)', x: 'calc(100%)' }}
      />
    </div>
  )
}

export default ManageUsers
