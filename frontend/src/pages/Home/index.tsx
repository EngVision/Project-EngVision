import TeacherLearn from '../../components/Icons/TeacherLearn'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.userName)
  const roleUser = useAppSelector((state) => state.app.role)

  const NotiDashboard = () => {
    return (
      <div className="flex flex-row px-5 justify-between bg-[#41AB3F] rounded-xl items-center">
        <div className="basis-1/3 text-xl text-white">
          Hi,{user}! <br /> You have number upcoming assignments due and have to
          finish number courses!
        </div>
        <div>
          {roleUser === 'Student' ? (
            <TeacherLearn height={241} width={240} />
          ) : (
            <TeacherLearn />
          )}
        </div>
      </div>
    )
  }
  const CardDashborad = (title: string, value: string) => {
    return (
      <div className="w-60 h-56 p-2 my-4 flex flex-col rounded-xl bg-white items-center justify-center text-xl">
        <div className="text-blue-600 text-center">{title}</div>
        <div className="text-blue-700 font-bold">{value}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <NotiDashboard />
      </div>
      <div className="flex flex-wrap justify-between space-x-1">
        {CardDashborad('ASSIGNMENTS', '3')}
        {CardDashborad('TOTAL ASSIGNMENTS', '6')}
        {CardDashborad('NEXT DUE', 'Tomorrow')}
        {CardDashborad('SUBMITTED ASSIGNMENTS', '1')}
        {CardDashborad('COURSES LEARNING', '1')}
        {CardDashborad('TOTAL COURSES', '2')}
        {CardDashborad('FINISHED COURSES', '1')}
        {CardDashborad('CERF LEVEL', 'C1')}
      </div>
    </div>
  )
}

export default Home
