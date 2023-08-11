import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Entities, LoginTypes, SignUpType, UserTypes } from 'src/utils/enums';
import { UserCreateDto, UserSignUpDto, UserUpdateDto } from 'src/dtos/user.dto';
import {
  addMinutesToDate,
  generateRandomToken,
  isValidEmail,
} from 'src/utils/helpers';
import { SearchService } from './search.service';
import { GlobalNotificationService } from './global-notification.service';
import { Pagination } from 'src/interfaces/pagination.interface';
import { AggregatorsInterface } from 'src/interfaces/aggregators.interface';
import { RolesInterface } from 'src/interfaces/roles.interface';
import { OtpInterface } from 'src/interfaces/otp.interface';
import environment from 'src/environments';
import { TokenParams } from 'src/interfaces/shared.interface';

@Injectable()
export class UserService extends SearchService {
  constructor(
    @InjectModel(Entities.User) private userModel: Model<UserInterface>,
    @InjectModel(Entities.Aggregator)
    private aggregatorModel: Model<AggregatorsInterface>,
    @InjectModel(Entities.Role)
    private roleModel: Model<RolesInterface>,
    private readonly globalNotficationService: GlobalNotificationService,
  ) {
    super(userModel);
  }

  public async find(
    lookFor,
  ): Promise<{ results: UserInterface[]; count: number }> {
    const results: UserInterface[] = await this.userModel
      .find(lookFor)
      .populate([Entities.Aggregator, Entities.Role]);
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
      .populate([Entities.Aggregator, Entities.Role])
      .select(withPassword ? '+password' : '');
  }

  /**
   * Create new user
   * @param user
   * @returns Promise<UserInterface>
   */
  public async create(
    user: UserCreateDto | UserSignUpDto,
    signUpType: SignUpType = SignUpType.CREATION,
  ): Promise<UserInterface> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // hash password with 10 salt rounds
    const loginType: LoginTypes = isValidEmail(user.loginId)
      ? LoginTypes.EMAIL
      : LoginTypes.PHONE;

    const aggregatorSearchKey =
      signUpType === SignUpType.CREATION ? '_id' : 'aggregatorCode';
    const aggregatorSearchValue =
      signUpType === SignUpType.CREATION
        ? user.aggregatorId
        : user.aggregatorCode;

    const aggregator = await this.aggregatorModel.findOne({
      [aggregatorSearchKey]: aggregatorSearchValue,
    });

    if (!aggregator) {
      throw new Error('The aggregator does not exist');
    }

    const isEmail = !!isValidEmail(user.loginId);

    const userTokenInfo = this.generateUserTokenInfo(user, isEmail);

    const { expiresBy: tokenExpires, otp: signUpToken } = userTokenInfo;

    const userModel = new this.userModel({
      ...user,
      password: hashedPassword,
      loginType,
      [Entities.Aggregator]: aggregator._id,
      [Entities.Role]: user.roleId,
      status: signUpType === SignUpType.CREATION,
      signUpToken,
      tokenExpires,
    });

    const newUser: UserInterface = await userModel.save();
    aggregator[Entities.User].push(newUser._id);
    aggregator.save();

    if (user.userType === UserTypes.ADMIN) {
      const role = await this.roleModel.findOne({
        _id: user.roleId,
      });
      role[Entities.User].push(newUser._id);
      role.save();
    }

    if (signUpType === SignUpType.REGISTRATION) {
      this.notifyUserOnSignUp(user, userTokenInfo);
    } else {
      this.notifyUserOnCreation(user as UserCreateDto);
    }

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

  private generateUserTokenInfo = (user, isEmail: boolean): OtpInterface => {
    const tokenParams: TokenParams = {
      alphabets: !!isEmail,
    };
    const signUpToken = generateRandomToken(user, tokenParams);
    const now = new Date();
    const expiresBy = addMinutesToDate(now, 10).toISOString();
    const token: OtpInterface = {
      otp: signUpToken,
      expiresBy,
      verified: true,
    };
    return token;
  };

  private sendUserOtp = async (phoneNumber: string, otp: OtpInterface) => {
    try {
      await this.globalNotficationService.sendOtp(phoneNumber, otp);
    } catch (e) {
      //logger
    }
  };

  private sendUserActivationLink = async (
    user: UserSignUpDto,
    { otp: token }: OtpInterface,
  ) => {
    try {
      await this.globalNotficationService.sendSignUpEmail(
        user,
        `${environment.clientUrl}/verify-email?activate=${token}`,
      );
    } catch (e) {
      //logger
    }
  };

  /**
   * Notifies a signed-up user
   * @param user
   * @param userTokenInfo
   * @returns
   */
  private notifyUserOnSignUp = (
    user: UserSignUpDto,
    userTokenInfo: OtpInterface,
  ) => {
    const { loginId } = user;
    const isEmail = !!isValidEmail(loginId);
    return isEmail
      ? this.sendUserActivationLink(user, userTokenInfo)
      : this.sendUserOtp(user.loginId, userTokenInfo);
  };

  /**
   * Notifies an admin-created user
   * @param user
   * @returns
   */
  private notifyUserOnCreation = (user: UserCreateDto) => {
    const { loginId } = user;
    const clientUrl = `${environment.clientUrl}/login`;
    const isEmail = !!isValidEmail(loginId);
    return isEmail
      ? this.globalNotficationService.sendNewUserCreationEmail(user, clientUrl)
      : this.globalNotficationService.sendNewUserCreationSms(user, clientUrl);
  };
}
