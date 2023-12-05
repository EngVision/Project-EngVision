import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import {
  STUDENT_ONBOARDING_STEPS,
  TEACHER_ONBOARDING_STEPS,
} from '../utils/guideTourSteps'
import { Role } from '../utils/constants'
import { useMutation } from '@tanstack/react-query'
import accountApi from '../services/accountApi'
import { setUser } from '../redux/app/slice'
import { useEffect, useState } from 'react'

const DefaultLayout = () => {
  const [showTour, setShowTour] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const showGetStarted = useAppSelector((state) => state.app.showingGetStarted)

  useEffect(() => {
    setTimeout(() => setShowTour(true), 500)
  }, [])

  const hideGuideTourMutation = useMutation({
    mutationFn: accountApi.setHideGuideTour,
  })

  const handleTourFinish = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]
    if (finishedStatuses.includes(status)) {
      hideGuideTourMutation.mutate()
      dispatch(setUser({ ...user, showGuideTour: false }))
    }
  }

  return (
    <div className="flex flex-row bg-bgDefault h-screen text-textColor">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-[0px]">
        <div className="px-8">
          <Header />
        </div>
        <div className="px-8 pb-8 flex-1  min-h-[0px] !overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <Joyride
        steps={
          (user?.role === Role.Student
            ? STUDENT_ONBOARDING_STEPS
            : user?.role === Role.Teacher
            ? TEACHER_ONBOARDING_STEPS
            : []) as Step[]
        }
        callback={handleTourFinish}
        spotlightPadding={2}
        run={user?.showGuideTour && !showGetStarted && showTour}
        continuous
        hideCloseButton
        showSkipButton
        showProgress
        styles={{
          overlay: {
            maxHeight: '100vh',
          },
          buttonNext: {
            backgroundColor: 'var(--primary)',
            padding: '6px 10px',
          },
          buttonBack: {
            color: 'var(--primary)',
          },
          buttonSkip: {
            color: 'var(--secondary)',
            fontSize: '16px',
          },
        }}
      />
    </div>
  )
}

export default DefaultLayout
