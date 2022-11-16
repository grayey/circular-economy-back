import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsController } from 'src/controllers/chats.controller';
import { ChatsService } from 'src/services/chats.service';
import { ChatsSchema } from 'src/schemas/chats.schema';
import { Schemata } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      Schemata.User,
      { name: 'Chats', schema: ChatsSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
