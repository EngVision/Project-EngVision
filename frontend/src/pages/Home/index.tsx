import React from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../utils/constants'

function Home() {
  return (
    <div>
      <Link
        to={ROUTES.docList}
        className="absolute top-[20px] left-[20px] text-[32px] text-[#61dafb]"
      >
        &gt; DocList
      </Link>
    </div>
  )
}

export default Home
