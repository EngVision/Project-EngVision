import { Avatar, Button, Form, Input, Rate } from 'antd'
import Star from '../../../components/Icons/Star'
import coursesApi from '../../../services/coursesApi'
import {
  CourseDetails,
  Review,
  ReviewParams,
} from '../../../services/coursesApi/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UPLOAD_FILE_URL } from '../../../utils/constants'

const { TextArea } = Input

interface ReviewsProps {
  course: CourseDetails
}

const Reviews: React.FC<ReviewsProps> = ({ course }) => {
  const queryClient = useQueryClient()

  const reviewMutation = useMutation({
    mutationFn: (review: ReviewParams) =>
      coursesApi.postReview(course.id, review),
  })

  const onFinish = async (values: ReviewParams) => {
    reviewMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courseDetail'] })
      },
    })
  }

  console.log(course.isReviewed)

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-2xl text-primary mb-6">Reviews</h3>
      </div>
      {course.isAttended && !course.isReviewed && (
        <div className="mb-8 ">
          <Form
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div className="font-bold text-sm mb-2">Review this course</div>
            <Form.Item<ReviewParams> name="comment" label="Reviews">
              <TextArea
                className="mb-6"
                rows={3}
                showCount
                maxLength={500}
                placeholder="Write your review here"
              />
            </Form.Item>
            <div className="flex items-center w-full justify-between">
              <Form.Item<ReviewParams> name="star" label="Reviews">
                <Rate
                  className="text-secondary mr-5"
                  character={<Star width={24} height={24}></Star>}
                  defaultValue={0}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-xl h-[2.5rem] w-[8rem]"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
      <div>
        {course.reviews &&
          course.reviews.map((review: Review) => (
            <div className="border-dashed border-[1px] rounded-lg mb-10">
              <div className="flex p-4">
                <Avatar
                  className="mr-3"
                  size={64}
                  src={
                    review.user.avatar
                      ? `${UPLOAD_FILE_URL}${review.user.avatar}`
                      : 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
                  }
                />
                <div className="w-full">
                  <div className="font-bold text-base mb-4">
                    {review.user.firstName + ' ' + review.user.lastName}
                  </div>
                  <div className="flex items-center mb-4">
                    <Rate
                      disabled
                      className="text-secondary mr-5"
                      character={<Star width={18} height={18}></Star>}
                      value={review.star}
                    ></Rate>
                    <span className="text-xs font-bold">
                      {review.updatedAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Reviews
