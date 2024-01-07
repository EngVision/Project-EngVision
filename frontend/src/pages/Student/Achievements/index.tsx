import React from 'react'
import { Progress } from 'antd'
import Achievement from '../../../components/Icons/Achievement'

interface Achievements {
  name: string
  description: string
  progress: number
}

const Achievements = () => {
  const AchievementsData: Achievements[] = [
    {
      name: 'Achievements 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 60,
    },
    {
      name: 'Achievements 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 80,
    },
    {
      name: 'Achievements 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 40,
    },
  ]

  const icons: React.ReactNode[] = [
    <Achievement key="icon1" />,
    <Achievement key="icon2" />,
    <Achievement key="icon3" />,
  ]

  const achievementsCard = (
    achievements: Achievements,
    icon: React.ReactNode,
  ) => {
    return (
      <div
        className="flex flex-row w-[80%] mx-auto my-5 p-2 justify-center content-center rounded-xl border-solid border-2 border-grey-400"
        key={achievements.name}
      >
        <div>{icon}</div>
        <div className="flex flex-col ml-5">
          <div className="text-xl font-bold flex-grow">{achievements.name}</div>
          <div className="flex-grow">{achievements.description}</div>
          <div className="flex-grow">
            <Progress percent={achievements.progress} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-5">
      <h1 className="text-blue-700">Achievements</h1>
      {AchievementsData.map((achievements, index) =>
        achievementsCard(achievements, icons[index]),
      )}
    </div>
  )
}

export default Achievements
