import AuthLayout from '../layouts/AuthLayout'
import DocumentList from '../pages/DocumentList'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import { UpdateProfile } from '../pages/UpdateProfile'
import { ROUTES } from '../utils/constants'

import type { RouteElement } from './types'

const publicRoutes: RouteElement[] = [
  {
    element: Home,
    path: ROUTES.home,
  },
  {
    element: DocumentList,
    path: ROUTES.docList,
  },
  {
    element: SignIn,
    layout: AuthLayout,
    path: ROUTES.signIn,
  },
  {
    element: SignUp,
    layout: AuthLayout,
    path: ROUTES.signUp,
  },
  {
    element: UpdateProfile,
    path: ROUTES.UpdateProfile,
  },
]

const privateRoutes: any[] = []

export { publicRoutes, privateRoutes }
