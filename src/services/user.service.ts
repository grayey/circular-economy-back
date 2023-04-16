import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Entities, LoginTypes } from 'src/utils/enums';
import { UserCreateDto, UserSignUpDto, UserUpdateDto } from 'src/dtos/user.dto';
import { isValidEmail } from 'src/utils/helpers';
import { SearchService } from './search.service';
import { Pagination } from 'src/interfaces/pagination.interface';
import { AggregatorsInterface } from 'src/interfaces/aggregators.interface';

@Injectable()
export class UserService extends SearchService {
  constructor(
    @InjectModel(Entities.User) private userModel: Model<UserInterface>,
    @InjectModel(Entities.Aggregator)
    private aggregatorModel: Model<AggregatorsInterface>,
  ) {
    super(userModel);
  }

  public async find(
    lookFor,
  ): Promise<{ results: UserInterface[]; count: number }> {
    const results: UserInterface[] = await this.userModel
      .find(lookFor)
      .populate(Entities.Aggregator);
    const count = await this.userModel.count();
    return {
      results,
      count,
    };
  }
  /**
   * Search all users
   * @param searchTerm
   * @param pagination
   * @returns Promise<{ results: UserInterface[]; count: number }>
   */
  public async findAll(
    searchTerm: string,
    pagination: Pagination,
    lookFor?: any,
  ): Promise<{ results: UserInterface[]; count: number }> {
    if (!pagination.paginate) {
      return this.find(lookFor);
    }
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
      .populate(Entities.Aggregator)
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
      [Entities.Aggregator]: user.aggregatorId,
      password: hashedPassword,
    });
    const newUser: UserInterface = await userModel.save();
    newUser.password = undefined;
    const aggregator = await this.aggregatorModel.findOne({
      _id: user.aggregatorId,
    });
    aggregator[Entities.User].push(newUser._id);
    aggregator.save();
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
