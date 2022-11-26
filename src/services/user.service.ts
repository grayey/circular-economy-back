import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CurrencyTypes, LoginTypes } from 'src/utils/enums';
import { UserCreateDto, UserSignUpDto, UserUpdateDto } from 'src/dtos/user.dto';
import { isValidEmail } from 'src/utils/helpers';
import { SearchService } from './search.service';
import { Pagination } from 'src/interfaces/pagination.interface';
import { Schemata } from 'src/schemas';

@Injectable()
export class UserService extends SearchService {
  constructor(
    @InjectModel(Schemata.User.name) private userModel: Model<UserInterface>,
  ) {
    super(userModel);
  }

  /**
   * List all users
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: UserInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
  ): Promise<{ results: UserInterface[]; count: number }> {
    return await this.paginate(searchTerm, pagination);
  }

  /**
   * Retrieve single user
   * @param search
   * @param withPassword
   * @returns Promise<UserInterface>
   */
  async findOne(
    search: { [key: string]: string },
    withPassword = 0,
  ): Promise<UserInterface> {
    return await this.userModel
      .findOne({ ...search })
      .select(withPassword ? '+password' : '');
  }

  /**
   * Create new user
   * @param user
   * @returns Promise<UserInterface>
   */
  public async create(
    user: UserCreateDto | UserSignUpDto,
  ): Promise<UserInterface> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // hash password with 10 salt rounds
    const loginType: LoginTypes = isValidEmail(user.loginId)
      ? LoginTypes.EMAIL
      : LoginTypes.PHONE;
    const userModel = new this.userModel({
      ...user,
      loginType,
      password: hashedPassword,
    });
    const newUser = await userModel.save();
    newUser.password = undefined;
    return newUser;
  }

  /**
   * Delete user by Id
   * @param id
   * @returns Promise<UserInterface>
   */
  public async delete(id: string): Promise<UserInterface> {
    return await this.userModel.findByIdAndRemove(id);
  }

  /**
   * Update user by Id
   * @param id
   * @param user
   * @returns Promise<UserInterface>
   */
  public async update(id: string, user: UserUpdateDto): Promise<UserInterface> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }
}
