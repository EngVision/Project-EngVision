import { MessageQuestionIcon, SettingsIcon } from '../Icons'

import { ROUTES } from '../../utils/constants'

import MenuItem from './MenuItem'

const ACCOUNT_ITEMS = [
  {
    icon: <SettingsIcon />,
    path: ROUTES.settings,
    title: 'Settings',
  },
  {
    icon: <MessageQuestionIcon />,
    path: ROUTES.helpCenter,
    title: 'Help Center',
  },
]

const Account = () => {
  return (
    <div>
      <div className="flex flex-col my-4 gap-2">
        {ACCOUNT_ITEMS.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  )
}

export default Account
