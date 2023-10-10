import React from 'react'

import AdminRoutes from './AdminRoutes'
import PublicRoutes from './PublicRoutes'
import StudentRoutes from './StudentRoutes'
import TeacherRoutes from './TeacherRoutes'
import { useAppSelector } from '../hooks/redux'
import { ROLES } from '../utils/constants'

const AppRoutes = () => {
  const role = useAppSelector((state) => state.app.role)

  return (
    <div>
      <PublicRoutes />
      {role === ROLES.admin.value && <AdminRoutes />}
      {role === ROLES.teacher.value && <TeacherRoutes />}
      {role === ROLES.student.value && <StudentRoutes />}
    </div>
  )
}

export default AppRoutes
