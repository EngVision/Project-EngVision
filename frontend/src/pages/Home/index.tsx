import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'
import { useTranslation } from 'react-i18next' // Import i18next

function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <Link to={ROUTES.docList} className="text-[32px] text-[#61dafb]">
        &gt;{t('Home.doclist')}
      </Link>
    </div>
  )
}

export default Home
