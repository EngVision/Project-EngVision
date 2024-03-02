import { Tag } from 'antd'
import { ExerciseType } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'

type Props = {
  type: ExerciseType
}

export default function ExerciseTypeTag({ type }: Props) {
  const { t } = useTranslation('', { keyPrefix: 'Exercises' })

  let color = 'default'
  switch (type) {
    case ExerciseType.ConstructedResponse:
      color = 'magenta'
      break
    case ExerciseType.DragAndDrop:
      color = 'red'
      break
    case ExerciseType.FillBlank:
      color = 'volcano'
      break
    case ExerciseType.MakeSentence:
      color = 'orange'
      break
    case ExerciseType.Match:
      color = 'gold'
      break
    case ExerciseType.MultipleChoice:
      color = 'lime'
      break
    case ExerciseType.Speaking:
      color = 'green'
      break
    case ExerciseType.Unscramble:
      color = 'cyan'
      break
    case ExerciseType.WordSearch:
      color = 'blue'
      break
  }

  return <Tag color={color}>{t(type as string)}</Tag>
}
