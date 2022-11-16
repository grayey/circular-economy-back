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
import { ApiTags } from '@nestjs/swagger';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user.service';
import { UserCreateDto, UserUpdateDto } from 'src/dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * This method lists users
   */
  @Get()
  async getAllUsers(
    @Query() { q, skip, limit },
  ): Promise<{ results: UserInterface[]; count: number }> {
    return await this.userService.findAll(q, { skip, limit });
  }

  /**
   * This method retrieves a single user based on a local attribute
   */
  @Get('exists')
  async getUserByAttribute(@Query() { attr, q }): Promise<UserInterface> {
    return await this.userService.findOne({ [attr]: q });
  }

  /**
   * This method retrieves a user by their id
   */
  @Get(':id')
  async getUserById(@Param('id') _id: string): Promise<UserInterface> {
    return await this.userService.findOne({ _id });
  }

  /**
   * This method creates a new user
   */
  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<UserInterface> {
    return await this.userService.create(user);
  }

  /**
   * This method updates a user
   * @param updateUserDto
   * @param id
   * @returns
   */
  @Put(':id')
  async update(
    @Body() updateUserDto: UserUpdateDto,
    @Param('id') id: string,
  ): Promise<UserInterface> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * This method deletes a user by id
   * @param id
   * @returns
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.delete(id);
  }
}
