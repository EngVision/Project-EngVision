import { Module } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { UserLevelController } from './user-level.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLevel, UserLevelSchema } from './schemas/user-level.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLevel.name, schema: UserLevelSchema },
    ]),
  ],
  controllers: [UserLevelController],
  providers: [UserLevelService],
  exports: [UserLevelService],
})
export class UserLevelModule {}
