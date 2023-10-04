import React from 'react'

import AdminRoutes from './AdminRoutes'
import PublicRoutes from './PublicRoutes'
import StudentRoutes from './StudentRoutes'
import TeacherRoutes from './TeacherRoutes'

const AppRoutes = () => {
  return (
    <div>
      <PublicRoutes />
      <AdminRoutes />
      <TeacherRoutes />
      <StudentRoutes />
    </div>
  )
}

export default AppRoutes
