import { Line } from 'react-chartjs-2'

const ExerciseChart = ({ options, data }: any) => {
  return (
    <div className="flex justify-center">
      <div style={{ width: '100%' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default ExerciseChart
