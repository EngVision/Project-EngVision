import React from 'react'
import { Route, Routes } from 'react-router-dom'

import DefaultLayout from '../layouts/DefaultLayout'
import NoLayout from '../layouts/NoLayout'

import type { RouteElement } from './types'

type RoleRoutesProps = {
  routes: RouteElement[]
}

const RoleRoutes = ({ routes }: RoleRoutesProps) => {
  return (
    <Routes>
      {routes.map((route) => {
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

export default RoleRoutes
