import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { TabsProps } from 'antd'
import { Avatar, Button, Collapse, Input, Rate, Tabs } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import coursesApi from '../../services/coursesApi'
import type {
  CourseDetails,
  ReviewParams,
} from '../../services/coursesApi/types'
import timeToNow from '../../utils/timeToNow'
const { Panel } = Collapse
const { TextArea } = Input

const onChange = (key: string) => {
  console.log(key)
}

const CourseDetailsPage = () => {
  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null)

  const [reviewContent, setReviewContent] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const fetchCourseDetails = async () => {
    try {
      if (courseId) {
        const response = await coursesApi.getCourseDetails(courseId)
        setCourseDetails(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value)
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleSubmitReview = async () => {
    const params: ReviewParams = {
      star: rating,
      comment: reviewContent,
    }
    try {
      const response = await coursesApi.postReview(courseId, params)
      if (response.data.success) {
        setRating(0)
        setReviewContent('')
        await fetchCourseDetails()
      }
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCourseDetails()
  }, [])

  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
  const itemsTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'About',
      children: <div>{courseDetails?.about}</div>,
    },
    {
      key: '2',
      label: 'Details',
      children: (
        <Collapse defaultActiveKey={['1']}>
          <Panel
            header={
              <span className="font-bold">
                Section 1: Everyday Communication
              </span>
            }
            key="1"
          >
            <p>{text}</p>
          </Panel>
          <Panel
            header={
              <span className="font-bold">
                Section 2: Everyday Communication
              </span>
            }
            key="2"
          >
            <p>{text}</p>
          </Panel>
          <Panel
            header={
              <span className="font-bold">
                Section 3: Everyday Communication
              </span>
            }
            key="3"
          >
            <p>{text}</p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: '3',
      label: 'Review',
      children: (
        <div className="flex flex-col">
          {/* Review Input */}
          <div className="flex mb-10 justify-center items-center">
            <div className="flex-1 mr-20">
              <Rate
                className="mb-2"
                onChange={handleRatingChange}
                value={rating}
              />
              <TextArea
                rows={4}
                placeholder="Write your review..."
                value={reviewContent}
                onChange={handleReviewContentChange}
              />
            </div>
            <Button type="primary" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </div>
          <div className="flex mb-10 flex-row">
            <div className="flex flex-col">
              {courseDetails?.reviews.toReversed().map((review) => (
                <div className="flex mb-10 items-start space-x-4">
                  <div>
                    <Avatar
                      size={50}
                      src="https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold">
                      {review.user.firstName + ' ' + review.user.lastName}
                    </div>
                    <div className="flex items-center">
                      <Rate disabled defaultValue={review.star} />
                      <span className="text-gray-500 ml-2">A day ago</span>
                    </div>
                    <div className="mt-2">{review.comment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Resources',
      children: <div></div>,
    },
  ]
  return courseDetails ? (
    <div className="flex flex-col pt-5 ">
      <h2 className="text-2xl font-semibold mb-10">Course</h2>
      <div className="flex ">
        <div className="w-2/3">
          <h3 className="text-lg font-medium mb-2">{courseDetails?.title}</h3>
          <div className="w-[40rem] h-[25rem] ">
            <img
              src="https://elements-cover-images-0.imgix.net/9a8a9942-4c73-45c7-bf65-47056f3e0e40?auto=compress%2Cformat&fit=max&w=1170&s=29a3437137ae3af5c0f4a32afde270be"
              alt="thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Tabs
            defaultActiveKey="1"
            items={itemsTabs}
            onChange={onChange}
          ></Tabs>
        </div>
        <div className="w-1/3 mx-10  ">
          <h3 className="text-lg font-semibold mb-2">Course Content</h3>
          <Collapse defaultActiveKey={['1']}>
            <Panel
              header={
                <span className="font-bold">
                  Section 1: Everyday Communication
                </span>
              }
              key="1"
            >
              <p>{text}</p>
            </Panel>
            <Panel
              header={
                <span className="font-bold">
                  Section 2: Everyday Communication
                </span>
              }
              key="2"
            >
              <p>{text}</p>
            </Panel>
            <Panel
              header={
                <span className="font-bold">
                  Section 3: Everyday Communication
                </span>
              }
              key="3"
            >
              <p>{text}</p>
            </Panel>
          </Collapse>
          <div className="text-4xl font-bold mt-10">{`${
            courseDetails?.price ? courseDetails.price : 0
          } VNĐ`}</div>
          <div className="flex flex-row justify-between items-center align-middle mt-10">
            <Button
              type="primary"
              className="flex items-center px-20 py-5 text-lg font-bold"
            >
              Enroll now!
            </Button>
            <Button
              shape="circle"
              icon={
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-red-500"
                  size="xl"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Course {courseId} not found</div>
  )
}

export default CourseDetailsPage
