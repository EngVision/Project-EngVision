import { useQuery } from '@tanstack/react-query'
import { CalendarProps } from 'antd/es/calendar'
import dayjs, { Dayjs } from 'dayjs'
import AppLoading from '../../../components/common/AppLoading'
import submissionApi from '../../../services/submissionApi'

const dateCellRender = (value: any) => {
  const { data: rawSubmissionList, isLoading: isLoadingRawSubmissionList } =
    useQuery({
      queryKey: ['submission'],
      queryFn: () => submissionApi.getSubmissionList(),
    })
  if (isLoadingRawSubmissionList) return <AppLoading />

  const formattedDate = value.format('YYYY-MM-DD')
  const hasSubmission = rawSubmissionList?.data.some((submission: any) => {
    const submissionDate = dayjs(submission.updatedAt).format('YYYY-MM-DD')
    return dayjs(submissionDate).isSame(formattedDate, 'day')
  })

  return (
    <div className={`${hasSubmission ? 'bg-[#F76519]' : ''} rounded-3xl`}>
      {hasSubmission ? (
        <span className="text-white">{value.date()}</span>
      ) : (
        value.date()
      )}
    </div>
  )
}

const monthCellRender = (value: any) => {
  return (
    <div
      className={`calendar-cell
        } rounded-3xl`}
    >
      {value.month() + 1}
    </div>
  )
}

const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (current, info) => {
  if (info.type === 'date') return dateCellRender(current)
  if (info.type === 'month') return monthCellRender(current)
  return info.originNode
}

export { cellRender, dateCellRender, monthCellRender }
