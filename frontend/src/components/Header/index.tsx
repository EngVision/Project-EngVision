import { Avatar } from 'antd'
import React, { useEffect, useState } from 'react'

import { NotificationIcon } from '../Icons'

import Search from './Search'
import { ProfileParams } from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import { getFileUrl } from '../../utils/common'
import LocalesButton from './LocalesButton'
import DarkModeButton from './DarkModeButton'

const Header = () => {
  const [account, setAccount] = useState<ProfileParams>()

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await authApi.fetchAuthUser()
        const data = res.data
        if (data) setAccount(data)
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
          <DarkModeButton />
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
