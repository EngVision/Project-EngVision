import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { CEFRLevel } from 'src/common/enums';
import { CourseDocument } from 'src/modules/courses/schemas/course.schema';
import { UsersService } from 'src/modules/users/users.service';
import { JwtPayload } from '../auth/types';
import { CoursesService } from '../courses/courses.service';
import { CourseDetailDto } from '../courses/dto';
import { FilesService } from '../files/files.service';
import { UserLevelService } from '../user-level/user-level.service';

@Injectable()
export class PersonalizedCourseService {
  private adminEmail: string;

  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly coursesService: CoursesService,
    private readonly userLevelService: UserLevelService,
  ) {
    this.adminEmail = process.env.ADMIN_EMAIL;

    this.create();
  }

  async create(): Promise<void> {
    console.log(this.adminEmail);
    const admin = await this.usersService.getByEmail(this.adminEmail);
    const personalizedCourse = await this.courseModel.findOne({
      title: 'Personalized Course',
      teacher: admin.id,
    });

    if (personalizedCourse) {
      return;
    }

    const data = readFileSync(
      join(process.cwd(), './src/assets/course-images/personalized-course.jpg'),
    );
    const file: Express.Multer.File = {
      originalname: 'personalized-course.jpg',
      mimetype: 'image/jpeg',
      buffer: data,
      fieldname: '',
      encoding: '',
      size: Buffer.byteLength(data),
      stream: null,
      destination: '',
      filename: 'personalized-course.jpg',
      path: '',
    };
    const courseThumbnail = await this.filesService.create(file, admin.id);

    const newCourse = new this.courseModel({
      title: 'Personalized Course',
      about: 'This is a personalized course',
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
      thumbnail: courseThumbnail.id,
      price: 0,
      isPersonalized: true,
    });
    await newCourse.save();
  }

  async get(user: JwtPayload): Promise<CourseDetailDto> {
    const admin = await this.usersService.getByEmail(this.adminEmail);
    const personalizedCourse = await this.courseModel.findOne({
      title: 'Personalized Course',
      teacher: admin.id,
    });

    if (!personalizedCourse) {
      await this.create();
    }

    const course = await this.coursesService.getCourse(
      personalizedCourse.id,
      user,
    );

    const userLevel = (await this.userLevelService.findOneByUser(user.sub))
      .CEFRLevel;

    course.sections = course.sections.filter(
      section => section.title === `Level ${userLevel}`,
    );

    return course;
  }
}
