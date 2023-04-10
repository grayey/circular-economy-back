import { Module } from '@nestjs/common';
import { RolesModule } from './roles.module';
import { CategoriesModule } from './categories.module';
import { TasksModule } from './tasks.module';
import { AggregatorsModule } from './aggregators.module';

@Module({
  imports: [TasksModule, CategoriesModule, RolesModule, AggregatorsModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}
