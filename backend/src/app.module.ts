import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ExamSubmissionsModule } from './modules/exam-submissions/exam-submissions.module';
import { ExamsModule } from './modules/exams/exams.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { FilesModule } from './modules/files/files.module';
import { OpenAiModule } from './modules/open-ai/open-ai.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { UserLevelModule } from './modules/user-level/user-level.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    //Library modules
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000, // 1 minutes in milliseconds
        limit: 100, // limit each IP to 100 requests per minute
      },
    ]),

    //App modules
    AuthModule,
    UsersModule,
    ExercisesModule,
    CoursesModule,
    ReviewsModule,
    FilesModule,
    SubmissionsModule,
    ExamsModule,
    ExamSubmissionsModule,
    UserLevelModule,
    OpenAiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
