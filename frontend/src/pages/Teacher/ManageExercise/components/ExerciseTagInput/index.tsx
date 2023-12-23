import React from 'react'
import { ExerciseTag } from '../../../../../utils/constants'
import { Cascader } from 'antd'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const exerciseTagOptions: Option[] = [
  {
    label: 'Grammar',
    value: ExerciseTag.Grammar,
  },
  {
    label: 'Vocabulary',
    value: ExerciseTag.Vocabulary,
  },
  {
    label: 'Listening',
    value: 'Listening',
    children: [
      {
        label: 'Listening Comprehension',
        value: ExerciseTag.ListeningComprehension,
      },
    ],
  },
  {
    label: 'Reading',
    value: 'Reading',
    children: [
      {
        label: 'Reading Comprehension',
        value: ExerciseTag.ReadingComprehension,
      },
      {
        label: 'Skimming',
        value: ExerciseTag.Skimming,
      },
      {
        label: 'Scanning',
        value: ExerciseTag.Scanning,
      },
    ],
  },
  {
    label: 'Writing',
    value: 'Writing',
    children: [
      {
        label: 'Coherence',
        value: ExerciseTag.Coherence,
      },
      {
        label: 'Conciseness',
        value: ExerciseTag.Conciseness,
      },
      {
        label: 'Organization',
        value: ExerciseTag.Organization,
      },
    ],
  },
  {
    label: 'Speaking',
    value: 'Speaking',
    children: [
      {
        label: 'Fluency',
        value: ExerciseTag.Fluency,
      },
      {
        label: 'Pronunciation',
        value: ExerciseTag.Pronunciation,
      },
    ],
  },
]

export const getTagList = (tags: ExerciseTag[][]): any => {
  return tags?.map((tag) => tag.at(-1))
}

export const transformToExerciseTagInputValue = (tags: ExerciseTag[]): any => {
  const res = tags?.map((tag) => {
    if (tag === ExerciseTag.ListeningComprehension) {
      return ['Listening', tag]
    } else if (
      tag === ExerciseTag.ReadingComprehension ||
      tag === ExerciseTag.Skimming ||
      tag === ExerciseTag.Scanning
    ) {
      return ['Reading', tag]
    } else if (
      tag === ExerciseTag.Coherence ||
      tag === ExerciseTag.Conciseness ||
      tag === ExerciseTag.Organization
    ) {
      return ['Writing', tag]
    } else if (
      tag === ExerciseTag.Fluency ||
      tag === ExerciseTag.Pronunciation
    ) {
      return ['Speaking', tag]
    } else {
      return [tag]
    }
  })

  return res
}

interface ExerciseTagInputProps {
  value?: any
  onChange?: (value: any) => void
}

function ExerciseTagInput({ onChange, value }: ExerciseTagInputProps) {
  return (
    <Cascader
      value={value}
      onChange={onChange}
      placeholder="Exercise type"
      options={exerciseTagOptions}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={Cascader.SHOW_CHILD}
    />
  )
}

export default ExerciseTagInput
