import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Tabs } from 'antd'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Star from '../../components/Icons/Star'
import AppLoading from '../../components/common/AppLoading'
import coursesApi from '../../services/coursesApi'
import { UPLOAD_FILE_URL } from '../../utils/constants'
import { formatDate } from '../../utils/formatDate'
import CourseContent from './CourseContent'
import Overview from './Overview'
import Reviews from './Reviews'
import CustomImage from '../../components/common/CustomImage'
const { TabPane } = Tabs

const CourseDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const tab = searchParams.get('tab') || '1'
  const { courseId = '' } = useParams<{ courseId: string }>()
  const queryClient = useQueryClient()

  const { data: courseDetail, isLoading } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: async () => coursesApi.getCourseDetails(courseId),
  })

  console.log(courseDetail)

  const attendCourseMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.postAttend(courseId),
  })

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key })
    navigate({ search: `?tab=${key}` })
  }

  const handleAttendCourse = async () => {
    attendCourseMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courseDetail'] })
      },
    })
  }

  if (isLoading) return <AppLoading />

  return (
    courseDetail && (
      <div className="flex flex-col bg-surface p-5 rounded-md shadow-lg">
        <div className="flex h-60 mb-8">
          <div className="h-full w-[18.75rem] mr-8 rounded-lg overflow-hidden">
            <CustomImage
              className="object-cover w-full h-full"
              src={`${UPLOAD_FILE_URL}${courseDetail.thumbnail}`}
            ></CustomImage>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex text-sm">
              <div>
                Last Update:{' '}
                <span className="font-bold">
                  {formatDate(courseDetail.updatedAt)}
                </span>
              </div>
            </div>
            <h2 className="text-4xl text-primary">{courseDetail.title}</h2>
            <p>{courseDetail.about}</p>
            <div className="flex items-center leading-6">
              <Star className="text-secondary mr-1.5" />
              <span className="mr-1.5 font-bold">{courseDetail.avgStar}</span>
              <div className="mr-1.5 text-wolfGrey">{`(${courseDetail.reviews.length} Rating)`}</div>
            </div>
            {!courseDetail.isAttended && (
              <div>
                <Button
                  className="flex items-center text-lg px-10 py-5"
                  type="primary"
                  onClick={handleAttendCourse}
                >
                  Enroll with ${courseDetail.price}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Tabs className="w-full " onChange={handleTabChange} activeKey={tab}>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  tab === '1' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '1' ? 'primary' : 'default'}
              >
                Overview
              </Button>
            }
            key="1"
          >
            <Overview {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  tab === '2' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '2' ? 'primary' : 'default'}
              >
                Course
              </Button>
            }
            key="2"
          >
            <CourseContent {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  tab === '3' ? '' : 'text-primary border-primary'
                }`}
                type={tab === '3' ? 'primary' : 'default'}
              >
                Reviews
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
