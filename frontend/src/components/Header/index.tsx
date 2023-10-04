import { Avatar } from 'antd'
import React, { useEffect, useState } from 'react'

import { NotificationIcon } from '../Icons'

import Search from './Search'
import { ProfileParams } from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import { getFileUrl } from '../../utils/common'

const Header = () => {
  const [account, setAccount] = useState<ProfileParams | null>(null)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await authApi.fetchAuthUser()
        setAccount(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchAccount()
  }, [])
  return (
    <div className="flex items-center py-9">
      <div className="flex-1 flex justify-between">
        <Search />

        <div className="flex items-center gap-4">
          <NotificationIcon width={40} height={40} />
          {account && (
            <Avatar
              className={`${account?.avatar ? '' : 'bg-blue-400 text-white'}`}
              src={getFileUrl(account?.avatar)}
              size="default"
            >
              {account?.avatar ? '' : account?.lastName[0]}
            </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
