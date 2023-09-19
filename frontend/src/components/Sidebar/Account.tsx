import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { ROUTES } from '../../utils/constants'

import MenuItem from './MenuItem'

const ACCOUNT_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    path: ROUTES.settings,
    title: 'Settings',
  },
]

const Account = () => {
  return (
    <div>
      <h4 className="text-[22px] pt-6">Account</h4>
      <div className="flex flex-col mt-4">
        {ACCOUNT_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Account
