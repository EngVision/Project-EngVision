import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { CourseDocument } from 'src/modules/courses/schemas/course.schema';
import { UsersService } from 'src/modules/users/users.service';
import { JwtPayload } from '../auth/types';
import { CoursesService } from '../courses/courses.service';
import { CourseDetailDto } from '../courses/dto';
import { UserLevelService } from '../user-level/user-level.service';

@Injectable()
export class PersonalizedCourseService {
  private adminEmail: string;

  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly userLevelService: UserLevelService,
  ) {
    this.adminEmail = process.env.ADMIN_EMAIL;

    this.create();
  }

  async create(): Promise<void> {
    const admin = await this.usersService.getByEmail(this.adminEmail);
    const personalizedCourse = await this.courseModel.findOne({
      isAdminCurriculum: true,
    });

    if (personalizedCourse) {
      return;
    }

    const newCourse = new this.courseModel({
      title: 'Curriculum by EngVision',
      about: 'This is a curriculum',
      level: CEFRLevel.Any,
      isPublished: true,
      teacher: admin.id,
      sections: [
        {
          title: 'Level A1',
        },
        {
          title: 'Level A2',
        },
        {
          title: 'Level B1',
        },
        {
          title: 'Level B2',
        },
        {
          title: 'Level C1',
        },
        {
          title: 'Level C2',
        },
      ],
      thumbnail: '/course-images/personalized-course.jpg',
      price: 0,
      isCurriculum: true,
      isAdminCurriculum: true,
    });
    await newCourse.save();
  }

  async get(user: JwtPayload): Promise<CourseDetailDto> {
    const curriculum = await this.courseModel.findOne({
      isAdminCurriculum: true,
    });

    if (!curriculum) {
      await this.create();
    }

    const course = await this.coursesService.getCourse(curriculum.id, user);

    const userLevel = (await this.userLevelService.findOneByUser(user.sub))
      .CEFRLevel;

    course.sections = course.sections.filter(
      section => section.title === `Level ${userLevel}`,
    );

    return course;
  }
}
