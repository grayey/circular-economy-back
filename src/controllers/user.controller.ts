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
import { generateRandomToken, isValidEmail } from 'src/utils/helpers';
import { TokenParams } from 'src/interfaces/shared.interface';
import { GlobalNotificationService } from 'src/services/global-notification.service';
import environment from 'src/environments';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly globalNotificationService: GlobalNotificationService,
  ) {}

  /**
   * This method lists users
   */
  @Get()
  async getAllUsers(
    @Query() { q, skip, limit, paginate = true, include },
  ): Promise<{ results: UserInterface[]; count: number }> {
    return await this.userService.findAll(q, {
      skip,
      limit,
      paginate,
      populate: include,
    });
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
   * Admin uses this method to create a new user
   */
  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<UserInterface> {
    const passwordStringParams: TokenParams = {}; // use defaults
    // user.password = generateRandomToken(user, passwordStringParams);
    user.password = 'password';
    user.status = true;
    const newUser = await this.userService.create(user);
    this.notifyUserOnCreation(user, `${environment.clientUrl}/login`);
    return newUser;
  }

  /**
   * Updates a user
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
   * Deletes a user by id
   * @param id
   * @returns
   */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.delete(id);
  }

  /**
   * Notifies an admin-created user
   * @param user
   * @param clientUrl
   * @returns
   */
  private notifyUserOnCreation = (user: UserCreateDto, clientUrl: string) => {
    if (isValidEmail(user.loginId)) {
      return this.globalNotificationService.sendNewUserCreationEmail(
        user,
        clientUrl,
      );
    }
    this.globalNotificationService.sendNewUserCreationSms(user, clientUrl);
  };
}
