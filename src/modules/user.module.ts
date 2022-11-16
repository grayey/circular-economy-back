import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
