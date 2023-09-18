import { Avatar, Card } from 'antd'

export const CourseCard = (course: any) => {
  const { Meta } = Card

  return (
    <Card
      className="w-[100%]"
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <p className="absolute left-0 top-0 bg-blue-500 text-white px-2 py-0.5 rounded-md m-1.5">
        {course.course.level}
      </p>
      <Meta title={course.course.title} className="py-3" />
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        description={course.course.teacher}
      />
    </Card>
  )
}
