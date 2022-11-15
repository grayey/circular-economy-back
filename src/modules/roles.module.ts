import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from 'src/controllers/roles.controller';
import { RolesService } from 'src/services/roles.service';
import { RolesSchema } from 'src/schemas/roles.schema';
import { UsersSchema } from 'src/schemas/user.schema';
import { SchemaCollections } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([SchemaCollections.User, SchemaCollections.Role]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
