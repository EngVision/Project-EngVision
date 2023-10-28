import React from 'react'
import DropdownCheckbox from '../../../../components/common/DropdownCheckbox'
import { CEFRLevel } from '../../../../utils/constants'
import { useAppDispatch } from '../../../../hooks/redux'
import { setFilterOptions } from '../../../../redux/course/slice'

const LevelsDropdown = () => {
  const dispatch = useAppDispatch()

  const onChange = (selection: string[]) => {
    dispatch(
      setFilterOptions({
        selectedLevels: selection,
      }),
    )
  }

  return (
    <DropdownCheckbox
      options={Object.values(CEFRLevel)}
      value={[]}
      onChange={onChange}
      label="Levels"
    />
  )
}

export default LevelsDropdown
