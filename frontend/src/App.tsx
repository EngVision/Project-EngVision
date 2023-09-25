import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './hooks/redux'
import DefaultLayout from './layouts/DefaultLayout'
import NoLayout from './layouts/NoLayout'
import { setUserAccountId } from './redux/app/slice'
import { privateRoutes, publicRoutes } from './routes'
import authApi from './services/authApi'
import { ROUTES } from './utils/constants'

const App: React.FC = () => {
  const userAccountId = useAppSelector((state) => state.app.userAccountId)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const fetchAuthUser = async () => {
    if (!userAccountId) {
      try {
        const {
          data: { data },
        } = await authApi.fetchAuthUser()

        if (data?.id) {
          dispatch(setUserAccountId(data.id))

          if (pathname === ROUTES.signIn || pathname.includes(ROUTES.signUp)) {
            navigate(ROUTES.home)
          }
        } else if (
          !publicRoutes.find((route) => route.path === pathname) &&
          !location.pathname.includes('reset-password')
        ) {
          navigate(ROUTES.signIn)
        }
      } catch (error) {
        navigate(ROUTES.signIn)
      }
    }
  }

  useEffect(() => {
    fetchAuthUser()
  }, [])

  return (
    <>
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
      {userAccountId && (
        <Routes>
          {privateRoutes.map((route) => {
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
      )}
    </>
  )
}

export default App
