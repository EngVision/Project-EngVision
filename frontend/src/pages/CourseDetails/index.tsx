import React, { useEffect, useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import coursesApi from '../../services/coursesApi'
import { Input, Tabs, Avatar, Rate, Button, Collapse } from 'antd'
import type { TabsProps } from 'antd'
const { Panel } = Collapse
const { TextArea } = Input
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
interface Course {
  id: string
  title: string
  teacher: string
  about: string
  introVideo: string
  thumbnail: string
  price: number
  level: string
  tags: string[] // Assuming tags are an array of strings
  createdAt: string // Assuming createdAt and updatedAt are ISO 8601 date strings
  updatedAt: string
  avgStar: number
}
const onChange = (key: string) => {
  console.log(key)
}

const CourseDetails = () => {
  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState<Course | null>(null)

  const [reviewContent, setReviewContent] = useState<string>('')
  const [rating, setRating] = useState<number>(0)

  const handleReviewContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value)
  }

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleSubmitReview = () => {
    // Handle the submission of the review, e.g., send it to a server.
    // You can access the 'reviewContent' and 'rating' variables here.
    // For demonstration purposes, we'll just log them to the console.
    console.log('Review Content:', reviewContent)
    console.log('Rating:', rating)
  }
  useEffect(() => {
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

    fetchCourseDetails()
  }, [courseId])

  const text = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
`
  const itemsTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'About',
      children: (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iste
          nesciunt eveniet temporibus, repellendus beatae rerum illo unde iusto
          impedit consectetur saepe odit qui ullam sunt nisi eius veritatis
          iure.
        </div>
      ),
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
            <div>
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div>
                  <Avatar
                    size={50}
                    src="https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-grow">
                  <div className="font-semibold">Minh Tri Nguyen</div>
                  <div className="flex items-center">
                    <Rate disabled defaultValue={4} />
                    <span className="text-gray-500 ml-2">A day ago</span>
                  </div>
                  <div className="mt-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nobis similique consectetur veniam, eligendi voluptas
                    tempore suscipit consequatur itaque asperiores modi. Culpa
                    voluptas officia magni ipsam, quae dolores ea obcaecati
                    eligendi.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mb-10 flex-row">
            <div>
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div>
                  <Avatar
                    size={50}
                    src="https://i.pinimg.com/736x/30/b5/49/30b54999b098050158ed13a1ecdcaab0.jpg"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-grow">
                  <div className="font-semibold">Minh Tri Nguyen</div>
                  <div className="flex items-center">
                    <Rate disabled defaultValue={4} />
                    <span className="text-gray-500 ml-2">A day ago</span>
                  </div>
                  <div className="mt-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nobis similique consectetur veniam, eligendi voluptas
                    tempore suscipit consequatur itaque asperiores modi. Culpa
                    voluptas officia magni ipsam, quae dolores ea obcaecati
                    eligendi.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Resources',
      children: (
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          delectus explicabo amet nulla, impedit magni porro nobis.
          Necessitatibus esse laudantium mollitia minus. Sint, odit omnis iste
          optio ducimus et blanditiis?
        </div>
      ),
    },
  ]
  return (
    <div className="flex flex-col pt-5 ">
      <h2 className="text-2xl font-semibold mb-10">Course</h2>
      <div className="flex ">
        <div className="w-2/3">
          <h3 className="text-lg font-medium mb-2">{courseDetails?.title}</h3>
          <div className="w-[40rem] h-[25rem] bg-black rounded-lg"></div>
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
  )
}

export default CourseDetails
