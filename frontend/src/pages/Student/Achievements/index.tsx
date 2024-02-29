import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Progress, Card } from 'antd'
import { achievementApi } from '../../../services/achievementApi'
import { AchievementItem } from '../../../services/achievementApi/types'
import { getFileUrl } from '../../../utils/common'
import AppLoading from '../../../components/common/AppLoading'
import { useTranslation } from 'react-i18next'

interface Achievements {
  name: string
  description: string
  progress: number
}

const Achievements = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  const { data: achievement, isLoading } = useQuery({
    queryKey: ['achievement'],
    queryFn: () => achievementApi.get(),
  })

  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(
    null,
  )

  const handleCardClick = (title: string) => {
    setExpandedAchievement((prev) => (prev === title ? null : title))
  }

  const achievementsCard = (achievement: AchievementItem) => {
    const isExpanded = expandedAchievement === achievement.title

    return (
      <Card
        hoverable
        style={{
          width: '15rem',
          transition: 'transform 0.5s ease-in-out',
          transform: isExpanded ? 'rotateY(180deg)' : 'none',
          overflow: 'hidden',
        }}
        className={`${achievement.progress === 1 ? 'text-yellow-500' : ''}`}
        key={achievement.title}
        onClick={() => handleCardClick(achievement.title)}
      >
        {isExpanded ? (
          <Card.Meta
            description={
              <div
                style={{ transform: 'rotateY(180deg)' }}
                className="my-[50%] text-center"
              >
                {achievement.description}
              </div>
            }
          />
        ) : (
          <div className="card-content flex justify-center flex-col">
            <div
              className={`image ${
                isExpanded ? 'hidden' : ''
              } flex justify-center`}
            >
              <img
                alt="achievement"
                className="w-96 rounded-md"
                src={getFileUrl(achievement.image)}
              />
            </div>
            <div className={`title ${isExpanded ? 'hidden' : ''}`}>
              <div className="text-xl font-bold flex justify-center">
                {achievement.title}
              </div>
            </div>
            <div className={`progress ${isExpanded ? 'hidden' : ''} `}>
              <Progress percent={achievement.progress * 100} />
            </div>
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-5">
      <h1 className="text-blue-700">{t('Achievements')}</h1>
      {isLoading ? (
        <AppLoading />
      ) : (
        achievement?.items.map((item) => achievementsCard(item))
      )}
    </div>
  )
}

export default Achievements
