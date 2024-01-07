import { Progress } from 'antd'
import Archievement from '../../../components/Icons/Archievement'

const Archive = () => {
  const archievementCard = () => {
    return (
      <div className="flex flex-row w-[80%] mx-auto my-5 p-2 justify-center content-center rounded-xl border-solid border-2 border-grey-400">
        <div>
          <Archievement />
        </div>
        <div className="flex flex-col ml-5">
          <div className="text-xl font-bold flex-grow">Archievement name</div>
          <div className="flex-grow">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            facilisis scelerisque nisl sit amet convallis.{' '}
          </div>
          <div className="flex-grow">
            <Progress percent={60} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-5">
      <h1 className="text-blue-700">Archivement</h1>
      {archievementCard()}
      {archievementCard()}
      {archievementCard()}
    </div>
  )
}

export default Archive
