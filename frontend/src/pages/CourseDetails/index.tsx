import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Tabs, message } from 'antd'
import sha256 from 'crypto-js/sha256'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import Star from '../../components/Icons/Star'
import AppLoading from '../../components/common/AppLoading'
import CustomImage from '../../components/common/CustomImage'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setIsNewMessage, setNewNotifyRoomId } from '../../redux/app/slice'
import chatApi from '../../services/chatApi'
import { SendMessageParams } from '../../services/chatApi/types'
import coursesApi from '../../services/coursesApi'
import enrollCourseApi from '../../services/enrollCourse'
import paymentsApi from '../../services/payment'
import { UPLOAD_FILE_URL } from '../../utils/constants'
import { formatDate } from '../../utils/formatDate'
import CourseContent from './CourseContent'
import Overview from './Overview'
import Reviews from './Reviews'
import { formatCurrency } from '../../utils/currency'
import ArrowLeft from '../../components/Icons/ArrowLeft'
const { TabPane } = Tabs

const CourseDetailsPage = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || '1'
  const { courseId = '' } = useParams<{ courseId: string }>()
  const queryClient = useQueryClient()
  const [enrollLoading, setEnrollLoading] = useState(false)
  const userChat = useAppSelector((state) => state.app.userChat)

  const { pathname } = useLocation()
  console.log('🚀 ~ CourseDetailsPage ~ pathname:', pathname)

  const { data: courseDetail, isLoading } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: async () => coursesApi.getCourseDetails(courseId),
  })

  const attendCourseMutation = useMutation({
    mutationFn: (courseId: string) => enrollCourseApi.enroll(courseId),
  })

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key })
    navigate({ search: `?tab=${key}` })
  }

  const enroll = async () => {
    attendCourseMutation.mutate(courseId, {
      onSuccess: async (response) => {
        queryClient.invalidateQueries({ queryKey: ['courseDetail'] })

        const teacherEmail = response?.teacher?.email
        const isTeacherChatRegistered = response?.teacher?.chatRegistered

        if (teacherEmail && isTeacherChatRegistered && userChat) {
          // TODO: Get auth token from Redux
          const userName = sha256(teacherEmail).toString()
          const room = await chatApi.createIm(
            userChat.userId,
            userChat.authToken,
            userName,
          )

          const sendMessageParams: SendMessageParams = {
            rid: room.room.rid,
            msg: `Hello, I have just enrolled in ${
              courseDetail ? courseDetail.title : 'your course'
            }.`,
          }

          await chatApi.sendMessage(
            userChat.userId,
            userChat.authToken,
            sendMessageParams,
          )
          dispatch(setNewNotifyRoomId(room.room.rid))
          dispatch(setIsNewMessage(true))
        }

        message.open({
          key: 'submitMessage',
          content: 'Enroll successfully.',
          type: 'success',
        })

        if (!isTeacherChatRegistered) {
          message.open({
            key: 'teacherChatMessage',
            content: 'Teacher have not registered chat account yet',
            type: 'error',
          })
        }
      },
      onError: () => {
        message.open({
          key: 'submitMessage',
          content: 'Enroll fail',
          type: 'error',
        })
      },
    })
  }

  const handleClickEnroll = async () => {
    setEnrollLoading(true)
    if (courseDetail?.price === 0) {
      enroll()
      return
    }

    const { isPaid } = await paymentsApi.checkPaid(courseDetail?.id || '')
    if (isPaid) {
      enroll()
      return
    }
    const payment = await paymentsApi.create(courseDetail?.id || '')

    window.location.href = payment.checkoutUrl
  }

  const back = () => {
    navigate(-1)
  }

  if (isLoading) return <AppLoading />

  return (
    courseDetail && (
      <div className="flex flex-col gap-4 bg-surface p-5 rounded-md shadow-lg min-h-full">
        {pathname.includes('/m/') && (
          <Button
            id="button-back"
            type="primary"
            ghost
            shape="circle"
            size="large"
            icon={<ArrowLeft />}
            onClick={() => back()}
          />
        )}
        <div className="flex flex-col lg:flex-row h-60 mb-8 gap-4 lg:gap-0">
          <div className="h-full w-full lg:w-[18.75rem] mr-0 lg:mr-8 rounded-lg overflow-hidden">
            <CustomImage
              className="object-cover w-full h-full"
              src={`${UPLOAD_FILE_URL}${courseDetail.thumbnail}`}
            ></CustomImage>
          </div>
          <div className="flex flex-col h-fit lg:h-full gap-2 lg:gap-0 justify-between">
            <div className="hidden lg:flex text-sm">
              {t('Course Details.Last Updated')}:{' '}
              <span className="font-bold">
                {formatDate(courseDetail.updatedAt)}
              </span>
            </div>
            <h2 className="text-2xl lg:text-4xl text-primary">
              {courseDetail.title}
            </h2>
            <p>{courseDetail.about}</p>
            <div className="flex items-center leading-6">
              <Star className="text-secondary mr-1.5" />
              <span className="mr-1.5 font-bold">
                {courseDetail.avgStar || 0}
              </span>
              <div className="mr-1.5 text-wolfGrey">{`(${
                courseDetail.reviews.length || 0
              } ${t('Course Details.rating')})`}</div>
            </div>
            {!courseDetail.isAttended && (
              <div>
                <Button
                  className="flex items-center text-lg px-10 py-5"
                  type="primary"
                  onClick={handleClickEnroll}
                  loading={enrollLoading || attendCourseMutation.isPending}
                >
                  {t('Course Details.Enroll with')}{' '}
                  {formatCurrency(courseDetail.price)}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Tabs className="w-full " onChange={handleTabChange} activeKey={tab}>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-base lg:text-lg px-3 lg:px-10 py-5 rounded-xl ${
                  tab === '1' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '1' ? 'primary' : 'default'}
              >
                {t('Course Details.Overview')}
              </Button>
            }
            key="1"
          >
            <Overview {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-base lg:text-lg px-3 lg:px-10 py-5 rounded-xl ${
                  tab === '2' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '2' ? 'primary' : 'default'}
              >
                {t('common.Course')}
              </Button>
            }
            key="2"
          >
            <CourseContent {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-base lg:text-lg px-3 lg:px-10 py-5 rounded-xl ${
                  tab === '3' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '3' ? 'primary' : 'default'}
              >
                {t('common.Reviews')}
              </Button>
            }
            key="3"
          >
            <Reviews course={courseDetail} />
          </TabPane>
        </Tabs>
      </div>
    )
  )
}

export default CourseDetailsPage
