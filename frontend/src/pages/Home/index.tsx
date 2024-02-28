import { useAppSelector } from '../../hooks/redux'
import Admin from './Admin'
import Student from './Student'
import Teacher from './Teacher'

export const Home = () => {
  const user = useAppSelector((state) => state.app.user)
  const role = user?.role

  return (
    <>
      {role === 'Student' && <Student />}
      {role === 'Teacher' && <Teacher />}
      {role === 'Admin' && <Admin />}
    </>
  )
}

export default Home
