import { useState } from 'react'
import { Radar } from 'react-chartjs-2'
import { useAppSelector } from '../../../hooks/redux'

type RadarChartData = {
  Listening?: any
  Reading?: any
  Writing?: any
  Speaking?: any
  category?: string
  comprehension?: any
  overall?: number
  grammar?: any
  vocabulary?: any
  skimming?: any
  scanning?: any
  organization?: any
  pronunciation?: any
  fluency?: any
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
    Listening: { start: '#5BB3D7', end: '#001171' },
    Reading: { start: '#F76519', end: '#001171' },
    Writing: { start: '#0088FE', end: '#001171' },
    Speaking: { start: '#00C49F', end: '#001171' },
  }

  const gradientColorsDark: GradientColors = {
    Listening: { start: '#274472', end: '#001171' },
    Reading: { start: '#A64510', end: '#001171' },
    Writing: { start: '#00569D', end: '#001171' },
    Speaking: { start: '#007E66', end: '#001171' },
  }

  const gradientColors = isDarkMode ? gradientColorsDark : gradientColorsLight

  const processScore = (value: any) => (value === null ? 0 : value)

  const dataRadarChart = [
    {
      category: 'Listening',
      comprehension: processScore(userLevel?.listening.comprehension),
      overall: 150,
      grammar: processScore(userLevel?.listening.grammar),
      vocabulary: processScore(userLevel?.listening.vocabulary),
    },
    {
      category: 'Reading',
      skimming: processScore(userLevel?.reading.skimming),
      scanning: processScore(userLevel?.reading.scanning),
      comprehension: processScore(userLevel?.reading.comprehension),
      overall: 200,
      grammar: processScore(userLevel?.reading.grammar),
      vocabulary: processScore(userLevel?.reading.vocabulary),
    },
    {
      category: 'Writing',
      organization: processScore(userLevel?.writing.organization),
      overall: 250,
      grammar: processScore(userLevel?.writing.grammar),
      vocabulary: processScore(userLevel?.writing.vocabulary),
    },
    {
      category: 'Speaking',
      pronunciation: processScore(userLevel?.speaking.pronunciation),
      fluency: processScore(userLevel?.speaking.fluency),
      overall: 175,
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

  const configRadarChart = {
    data: {
      labels: selectedCategory
        ? Object.keys(dataMap[selectedCategory]).filter(
            (key) => key !== 'overall',
          )
        : Object.keys(dataMap),
      datasets: [
        {
          label: selectedCategory ? selectedCategory : 'Overall',
          data: selectedCategory
            ? Object.values(dataMap[selectedCategory]).filter(
                (key) => key !== 'overall',
              )
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
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 250,
          pointLabels: {
            fontSize: 20,
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
    },
  }

  const handleClick = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="bg-surface rounded-2xl flex justify-center mb-8 p-5">
      <div style={{ width: '70%' }}>
        <p className="text-2xl font-bold ">Your Skills</p>
        <div style={{ width: '90%' }}>
          <Radar {...configRadarChart} />
        </div>
      </div>
      <div style={{ width: '30%', paddingLeft: '20px' }}>
        <div>
          <div
            className="rounded-2xl mb-3 hover:cursor-pointer bg-gradient-to-r from-[#8B5CF6] to-[#001171] text-white transform transition-transform hover:scale-105"
            onClick={() => handleClick('')}
          >
            <div className="w-[100%/2] h-40 p-2 my-4 flex flex-col items-center justify-center text-2xl">
              <div className="text-5xl font-bold">{userLevel?.overall}</div>
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
                    {processScore(item.overall)}
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
