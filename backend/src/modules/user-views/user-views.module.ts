import { Module } from '@nestjs/common';
import { UserViewsService } from './user-views.service';
import { UserViewsController } from './user-views.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserView, UserViewSchema } from './schemas/user-view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserView.name, schema: UserViewSchema },
    ]),
  ],
  controllers: [UserViewsController],
  providers: [UserViewsService],
  exports: [UserViewsService],
})
export class UserViewsModule {}
