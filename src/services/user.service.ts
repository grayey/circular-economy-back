import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CurrencyTypes, LoginTypes } from 'src/utils/enums';
import { UserDto } from 'src/dtos/user.dto';
import { isValidEmail } from 'src/utils/helpers';
import { SearchService } from './search.service';
import { Pagination } from 'src/interfaces/pagination.interface';

@Injectable()
export class UserService extends SearchService {
  constructor(@InjectModel('Users') private userModel: Model<UserInterface>) {
    super(userModel);
  }

  public async findAll(
    searchTerm: string,
    pagination: Pagination,
  ): Promise<{ results: UserInterface[]; count: number }> {
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(
    search: { [key: string]: string },
    withPassword = 0,
  ): Promise<UserInterface> {
    const selectPassword = withPassword ? '+password' : '';
    return await this.userModel
      .findOne({ ...search })
      .select(selectPassword)
      .lean();
  }

  public async create(user: UserInterface): Promise<UserInterface> {
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

  public async delete(id: string): Promise<UserInterface> {
    return await this.userModel.findByIdAndRemove(id);
  }

  public async update(id: string, user: UserInterface): Promise<UserInterface> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }
}
