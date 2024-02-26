import { Dropdown, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { showGetStarted } from '../../redux/app/slice'
import { FACEBOOK_SOCIAL_URL, YOUTUBE_SOCIAL_URL } from '../../utils/constants'
import { useTranslation } from 'react-i18next'
import {
  FacebookCircleIcon,
  HelpMenuIcon,
  InfoCircleIcon,
  VideoIcon,
} from '../Icons'

const HelpMenu = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Header' })
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      key: 'user_guide',
      label: (
        <div
          className="flex items-center gap-2 py-1"
          onClick={() => {
            dispatch(showGetStarted())
          }}
        >
          <InfoCircleIcon width={20} height={20} />
          {t('User guides')}
        </div>
      ),
    },
    {
      key: 'blog',
      label: (
        <Link
          to={FACEBOOK_SOCIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 py-1"
        >
          <FacebookCircleIcon width={20} height={20} />
          Fanpage
        </Link>
      ),
    },
    {
      key: 'video',
      label: (
        <Link
          to={YOUTUBE_SOCIAL_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 py-1"
        >
          <VideoIcon width={20} height={20} />
          Videos
        </Link>
      ),
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
      className="text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
      placement="bottomRight"
    >
      <div id="help-menu" className="flex">
        <HelpMenuIcon width={20} height={20} />
      </div>
    </Dropdown>
  )
}

export default HelpMenu
