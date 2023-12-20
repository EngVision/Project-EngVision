import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import CustomImage from '../../../components/common/CustomImage'
import type { CourseDetails } from '../../../services/coursesApi/types'
import { UPLOAD_FILE_URL } from '../../../utils/constants'
interface Props {
  course: CourseDetails
}
const FeaturedCourse = ({ course }: Props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row md:h-[19rem] lg:gap-6 items-center bg-surface rounded-xl overflow-hidden ">
      <CustomImage
        onClick={() => navigate(`./${course.id}`)}
        className="object-cover rounded-xl h-full w-1/2 cursor-pointer"
        src={`${UPLOAD_FILE_URL}${course.thumbnail}`}
      />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <span
            onClick={() => navigate(`./${course.id}`)}
            className="text-2xl font-bold uppercase cursor-pointer transition-colors duration-300 hover:text-primary "
          >
            {course.title}
          </span>
          <div className="font-light max-lg:line-clamp-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis consectetur autem eveniet alias voluptatum numquam
            placeat similique expedita ducimus possimus ipsum voluptas, neque
            esse nam veritatis nemo blanditiis cumque libero!
          </div>
        </div>
        <div>
          <Button
            className="h-full rounded-xl"
            onClick={() => navigate(`./${course.id}`)}
          >
            <span className="text-lg text-primary">View Course</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCourse
