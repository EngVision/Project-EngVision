import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { useAppSelector } from '../../../hooks/redux'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

type RadarChartData = {
  overall?: number
  listening?: number
  reading?: number
  writing?: number
  speaking?: number
  comprehension?: number
  grammar?: number
  vocabulary?: number
  skimming?: number
  scanning?: number
  organization?: number
  pronunciation?: number
  fluency?: number
  coherence?: number
  conciseness?: number
}

type DataMap = {
  [key: string]: RadarChartData
}

type GradientColors = {
  [key: string]: { start: string; end: string }
}

const RadarChart = () => {
  const isDarkMode = useAppSelector((state) => state.app.darkMode)
  const userLevel = useAppSelector((state) => state.app.currentLevel)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const gradientColorsLight: GradientColors = {
    Listening: { start: '#C8B4E5', end: '#759fdd' },
    Reading: { start: '#FFD5B1', end: '#759fdd' },
    Writing: { start: '#99C2FF', end: '#759fdd' },
    Speaking: { start: '#C5FFE0', end: '#759fdd' },
  }

  const gradientColorsDark: GradientColors = {
    Listening: { start: '#7A63AE', end: '#759fdd' },
    Reading: { start: '#D9966E', end: '#759fdd' },
    Writing: { start: '#4F8CCB', end: '#759fdd' },
    Speaking: { start: '#5B9B76', end: '#759fdd' },
  }

  const gradientColors = isDarkMode ? gradientColorsDark : gradientColorsLight

  const processScore = (value: any) => (value === null ? 0 : value)

  const dataRadarChart = [
    {
      category: 'Listening',
      overall: processScore(userLevel?.listening.overall),
      comprehension: processScore(userLevel?.listening.comprehension),
      grammar: processScore(userLevel?.listening.grammar),
      vocabulary: processScore(userLevel?.listening.vocabulary),
    },
    {
      category: 'Reading',
      overall: processScore(userLevel?.reading.overall),
      skimming: processScore(userLevel?.reading.skimming),
      scanning: processScore(userLevel?.reading.scanning),
      comprehension: processScore(userLevel?.reading.comprehension),
      grammar: processScore(userLevel?.reading.grammar),
      vocabulary: processScore(userLevel?.reading.vocabulary),
    },
    {
      category: 'Writing',
      overall: processScore(userLevel?.writing.overall),
      coherence: processScore(userLevel?.writing.coherence),
      conciseness: processScore(userLevel?.writing.conciseness),
      organization: processScore(userLevel?.writing.organization),
      grammar: processScore(userLevel?.writing.grammar),
      vocabulary: processScore(userLevel?.writing.vocabulary),
    },
    {
      category: 'Speaking',
      overall: processScore(userLevel?.speaking.overall),
      pronunciation: processScore(userLevel?.speaking.pronunciation),
      fluency: processScore(userLevel?.speaking.fluency),
      grammar: processScore(userLevel?.speaking.grammar),
      vocabulary: processScore(userLevel?.speaking.vocabulary),
    },
  ]

  const dataMap: DataMap = {
    Listening: dataRadarChart[0],
    Reading: dataRadarChart[1],
    Writing: dataRadarChart[2],
    Speaking: dataRadarChart[3],
  }

  const data = {
    labels: selectedCategory
      ? Object.keys(dataMap[selectedCategory]).filter(
          (key) => key !== 'overall' && key !== 'category',
        )
      : Object.keys(dataMap),
    datasets: [
      {
        label: selectedCategory ? selectedCategory : 'Overall',
        data: selectedCategory
          ? Object.entries(dataMap[selectedCategory])
              .filter(([key]) => key !== 'overall' && key !== 'category')
              .map(([, value]) => value)
          : Object.values(dataMap).map((item) => item.overall),
        backgroundColor:
          selectedCategory && gradientColors[selectedCategory]
            ? gradientColors[selectedCategory].end + '80'
            : '#00117150',
        borderColor:
          selectedCategory && gradientColors[selectedCategory]
            ? gradientColors[selectedCategory].start
            : '#8B5CF6',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        pointLabels: {
          fontSize: 30,
          fontColor: isDarkMode ? '#FFFFFF' : '#000000',
        },
        grid: {
          color: isDarkMode ? '#555555' : '#DDDDDD',
        },
        ticks: {
          display: false,
        },
        angleLines: {
          color: isDarkMode ? '#555555' : '#DDDDDD',
        },
      },
    },
  } as any

  const handleClick = (category: string) => {
    setSelectedCategory(null)
    setSelectedCategory(category)
  }

  return (
    <div className="bg-surface rounded-2xl flex justify-center mb-8 p-5">
      <div style={{ width: '70%' }}>
        <p className="text-2xl font-bold ">Your Skills</p>
        <div className="w-[80%] h-[90%] mx-auto">
          <Radar data={data} options={options} />
        </div>
        <div className="flex text-center justify-center">
          {selectedCategory ? selectedCategory : 'Overall'}
        </div>
      </div>
      <div style={{ width: '30%', paddingLeft: '20px' }}>
        <div>
          <div
            className="rounded-2xl mb-3 hover:cursor-pointer bg-gradient-to-r  to-[#a375f7] from-[#8ba3dd] text-white transform transition-transform hover:scale-105"
            onClick={() => handleClick('')}
          >
            <div className="w-[100%/2] h-40 p-2 my-4 flex flex-col items-center justify-center text-2xl">
              <div className="text-5xl font-bold">{userLevel?.overall}%</div>
              <div className=" text-center">Overall</div>
            </div>
          </div>

          {dataRadarChart.map((item) => {
            const categoryStyle = {
              background: `linear-gradient(to right, ${
                gradientColors[item.category].start
              }, ${gradientColors[item.category].end})`,
            }

            return (
              <div
                style={categoryStyle}
                key={item.category}
                className={`text-white mb-1 basis-1/3 rounded-2xl my-3 hover:cursor-pointer transform transition-transform hover:scale-105`}
                onClick={() => handleClick(item.category)}
              >
                <div className="w-[100%/2] h-20 p-2 my-4 flex flex-col items-center justify-center text-xl">
                  <div className="text-3xl font-bold">
                    {processScore(item.overall)}%
                  </div>
                  <div className="text-center">{item.category}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RadarChart
