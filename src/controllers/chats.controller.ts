import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { ChatsService } from '../services/chats.service';
import { ChatsInterface } from '../interfaces/chats.interface';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Get()
  findAll(): Promise<ChatsInterface[]> {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<ChatsInterface> {
    return this.chatService.findOne(id);
  }

  @Post()
  create(@Body() createChatDto): Promise<ChatsInterface> {
    return this.chatService.create(createChatDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<ChatsInterface> {
    return this.chatService.delete(id);
  }

  @Put(':id')
  update(@Body() updateChatDto, @Param('id') id): Promise<ChatsInterface> {
    return this.chatService.update(id, updateChatDto);
  }

  // @Patch(':id')
  // findByIdAndToggleEnable(@Param('id') id): Promise<ChatsInterface> {
  //     return this.ChatService.findByIdAndToggleEnable(id);
  // }
}
