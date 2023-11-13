import {
  CloseCircleWhiteIcon,
  TickCircleWhiteIcon,
} from '../../../../components/Icons'

interface ExplainProps {
  isCorrect: boolean
  explanation: string
}

function Explain({ isCorrect, explanation }: ExplainProps) {
  return (
    <div
      className={`w-full p-5 rounded-md flex gap-4 mt-7 ${
        isCorrect ? 'bg-green-500' : 'bg-secondary'
      }`}
    >
      {isCorrect ? <TickCircleWhiteIcon /> : <CloseCircleWhiteIcon />}
      <div className="flex-1 text-primary flex flex-col gap-2 text-white">
        {
          <b className="text-[18px] leading-6">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </b>
        }
        <p>{explanation}</p>
      </div>
    </div>
  )
}

export default Explain
