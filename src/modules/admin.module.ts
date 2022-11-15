import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user.module';
import { RolesModule } from './roles.module';
import { CategoriesModule } from './categories.module';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TasksModule, CategoriesModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
