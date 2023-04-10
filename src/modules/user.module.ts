import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { Schemata } from 'src/schemas';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([Schemata.User, Schemata.Aggregator]),
    NotificationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
