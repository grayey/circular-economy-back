import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from 'src/controllers/roles.controller';
import { RolesService } from 'src/services/roles.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.User, Schemata.Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
