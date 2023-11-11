import { EmojiHappyIcon, EmojiSadIcon } from '../../../../components/Icons'

interface ExplainProps {
  isCorrect: boolean
  explanation: string
}

function Explain({ isCorrect, explanation }: ExplainProps) {
  return (
    <div className="w-full p-5 border-2 border-solid border-primary rounded-md flex items-center gap-4 mt-5">
      {isCorrect ? <EmojiHappyIcon /> : <EmojiSadIcon />}
      <div className="flex-1 text-primary flex flex-col gap-2">
        {isCorrect && <b>Good job!</b>}
        <p>{explanation}</p>
      </div>
    </div>
  )
}

export default Explain
