import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { responseOk } from 'src/utils/formatters';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * This method lists users
   */
  @Get()
  async getAllUsers(@Query() { q, skip, limit }): Promise<any> {
    return await this.userService.findAll(q, { skip, limit });
  }

  /**
   * This method retrieves a user by their id
   */
  @Get(':id')
  async getUserById(@Param('id') id): Promise<UserInterface> {
    return await this.userService.findOne({ _id: id });
  }

  /**
   * This method creates a new user
   */
  @Post()
  async createUser(@Body() user: UserInterface): Promise<UserInterface> {
    return await this.userService.create(user);
  }

  /**
   * This method updates a user
   * @param updateUserDto
   * @param id
   * @returns
   */
  @Put(':id')
  async update(@Body() updateUserDto, @Param('id') id): Promise<UserInterface> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * This method deletes a user by id
   * @param id
   * @returns
   */
  @Delete(':id')
  async delete(@Param('id') id): Promise<UserInterface> {
    return await this.userService.delete(id);
  }
}
