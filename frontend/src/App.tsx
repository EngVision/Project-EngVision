import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { useAppSelector } from './hooks/redux'
import DefaultLayout from './layouts/DefaultLayout'
import NoLayout from './layouts/NoLayout'
import { setUserAccountId } from './redux/app/slice'
import { publicRoutes } from './routes'
import { ROUTES } from './utils/constants'

const App: React.FC = () => {
  const userAccountId = useAppSelector((state) => state.app.userAccountId)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userAccountId) {
      const id = localStorage.getItem('userAccountId')
      if (id) {
        setUserAccountId(id)
      } else {
        navigate(ROUTES.signIn)
      }
    }
  }, [])

  return (
    <Routes>
      {publicRoutes.map((route) => {
        const Comp = route.element
        let Layout = DefaultLayout

        if (route.layout === null) {
          Layout = NoLayout
        } else if (route.layout) {
          Layout = route.layout
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Layout>
                <Comp />
              </Layout>
            }
          />
        )
      })}
    </Routes>
  )
}

export default App
