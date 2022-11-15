import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChatsInterface } from '../interfaces/chats.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class ChatsService {
  public relations;

  constructor(
    @InjectModel('Chats') private chatModel: Model<ChatsInterface>,
    @InjectModel('Users') private userModel: Model<UserInterface>,
  ) {
    this.relations = { users: userModel };
  }

  async findAll(): Promise<ChatsInterface[]> {
    return await this.chatModel.find();
  }

  async findOne(id: string): Promise<ChatsInterface> {
    const chat = await this.chatModel.findOne({ _id: id });
    const users = await this.userModel.find({ chat_id: chat._id });
    chat['users'] = users;
    return chat;
  }

  async create(chat: ChatsInterface): Promise<ChatsInterface> {
    const newChatsInterface = new this.chatModel(chat);
    return await newChatsInterface.save();
  }

  async delete(id: string): Promise<ChatsInterface> {
    return await this.chatModel.findByIdAndRemove(id);
  }

  async update(id: string, chat: ChatsInterface): Promise<ChatsInterface> {
    return await this.chatModel.findByIdAndUpdate(id, chat, {
      new: true,
    });
  }
}
