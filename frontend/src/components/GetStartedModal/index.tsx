import { Alert, Button, Checkbox, Modal } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  hideGetStarted,
  setShowGetStartedAgain,
  showGetStarted,
} from '../../redux/app/slice'
import {
  Role,
  STUDENT_GET_STARTED_VIDEO_URL,
  TEACHER_GET_STARTED_VIDEO_URL,
} from '../../utils/constants'

function GetStartedModal() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)

  const videoUrl = useMemo(() => {
    if (user?.role === Role.Student) {
      return STUDENT_GET_STARTED_VIDEO_URL
    } else if (user?.role === Role.Teacher) {
      return TEACHER_GET_STARTED_VIDEO_URL
    }
    return STUDENT_GET_STARTED_VIDEO_URL
  }, [user])

  const showingGetStarted = useAppSelector(
    (state) => state.app.showingGetStarted,
  )
  const showGetStartedAgain = useAppSelector(
    (state) => state.app.showGetStartedAgain,
  )
  const [checked, setChecked] = useState(false)

  const handleCloseModal = () => {
    dispatch(hideGetStarted())
    if (checked) {
      dispatch(setShowGetStartedAgain(false))
    }
  }

  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked)
  }

  useEffect(() => {
    if (showGetStartedAgain) {
      dispatch(showGetStarted())
    }
  }, [])

  return (
    <div>
      <Modal
        title={<h2 className="text-primary">Get started</h2>}
        open={showingGetStarted}
        onCancel={handleCloseModal}
        footer={() => (
          <div className="flex justify-between">
            <Checkbox
              onChange={handleChangeCheckbox}
              checked={checked}
              className="flex items-center"
            >
              Don't show again
            </Checkbox>
            <Button type="primary" onClick={handleCloseModal}>
              Get started now
            </Button>
          </div>
        )}
        width={640}
        closeIcon={null}
      >
        <div className="flex flex-col gap-4 py-4">
          <iframe
            height="315"
            src={`${videoUrl}&autoplay=1&mute=1`} // Add &autoplay=1&mute=1 to autoplay video
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
            className="rounded-sm"
          />
          <Alert
            message={<h3>Welcome to EngVision</h3>}
            description={
              <span>
                Join us in this quick tutorial as we guide you through the
                essential steps to get started. Discover powerful features,
                personalize your experience, and connect with a thriving
                community of users. Whether you're a pro or a beginner,
                <b> EngVision</b> is designed for you. Let's dive in!
              </span>
            }
            type="info"
            showIcon
            className="w-[560]"
          />
        </div>
      </Modal>
    </div>
  )
}

export default GetStartedModal
