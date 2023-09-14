import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'

function Home() {
  return (
    <div>
      <Link to={ROUTES.docList} className="text-[32px] text-[#61dafb]">
        &gt; DocList
      </Link>
    </div>
  )
}

export default Home
