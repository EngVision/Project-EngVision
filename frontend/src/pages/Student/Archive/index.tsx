import React from 'react'
import { Progress } from 'antd'
import Archievement from '../../../components/Icons/Archievement'

const Archive = () => {
  // Mảng dữ liệu mẫu
  const archievementsData = [
    {
      name: 'Archievement 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 60,
    },
    {
      name: 'Archievement 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 80,
    },
    {
      name: 'Archievement 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis scelerisque nisl sit amet convallis.',
      progress: 40,
    },
  ]

  const archievementCard = (archievement: any) => {
    return (
      <div
        className="flex flex-row w-[80%] mx-auto my-5 p-2 justify-center content-center rounded-xl border-solid border-2 border-grey-400"
        key={archievement.name}
      >
        <div>
          <Archievement />
        </div>
        <div className="flex flex-col ml-5">
          <div className="text-xl font-bold flex-grow">{archievement.name}</div>
          <div className="flex-grow">{archievement.description}</div>
          <div className="flex-grow">
            <Progress percent={archievement.progress} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-xl p-5">
      <h1 className="text-blue-700">Archivement</h1>
      {archievementsData.map((archievement) => archievementCard(archievement))}
    </div>
  )
}

export default Archive
