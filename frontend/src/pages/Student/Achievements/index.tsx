import { useQuery } from '@tanstack/react-query'
import { Progress } from 'antd'
import { achievementApi } from '../../../services/achievementApi'
import { AchievementItem } from '../../../services/achievementApi/types'
import { getFileUrl } from '../../../utils/common'
import AppLoading from '../../../components/common/AppLoading'

interface Achievements {
  name: string
  description: string
  progress: number
}

const Achievements = () => {
  const { data: achievement, isLoading } = useQuery({
    queryKey: ['achievement'],
    queryFn: () => achievementApi.get(),
  })

  const achievementsCard = (achievements: AchievementItem) => {
    return (
      <div
        className="flex flex-row w-[80%] mx-auto my-5 p-2 justify-start rounded-xl border-solid border-2 border-grey-400"
        key={achievements.title}
      >
        <div>
          <img src={getFileUrl(achievements.image)} alt="" />
        </div>
        <div className="flex flex-col flex-1 ml-5">
          <div className="text-xl font-bold flex-grow">
            {achievements.title}
          </div>
          <div className="flex-grow">{achievements.description}</div>
          <div className="flex-grow">
            <Progress percent={achievements.progress * 100} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-5">
      <h1 className="text-blue-700">Achievements</h1>
      {isLoading ? (
        <AppLoading />
      ) : (
        achievement?.items.map((item) => achievementsCard(item))
      )}
    </div>
  )
}

export default Achievements
