import React from 'react'

import LogoutButton from '../../components/Header/LogoutButton'
import LocalesButton from '../../components/Header/LocalesButton'

const HelpCenter = () => {
  return (
    <div className="flex flex-col">
      <LocalesButton />
      <div className="mt-2">
        <LogoutButton />
      </div>
    </div>
  )
}

export default HelpCenter
