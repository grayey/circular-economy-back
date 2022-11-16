import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { compareSync } from 'bcrypt';
import { UserInterface } from 'src/interfaces/user.interface';
import { OtpInterface } from 'src/interfaces/otp.interface';
import SmsService from './sms.service';
import { UserCreateDto } from 'src/dtos/user.dto';
import { Schemata } from 'src/schemas';
import { async } from 'rxjs';
import { formatErrors } from 'src/utils/helpers';
import { ApiErrors } from 'src/utils/enums';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private smsService: SmsService,
    @InjectModel(Schemata.OTP.name)
    private otpModel: Model<OtpInterface>,
  ) {}

  public validateUser = async (
    loginId: string,
    password: string,
  ): Promise<any> => {
    const user: UserInterface = await this.usersService.findOne({ loginId }, 1);
    const passwordMatches = compareSync(password, user.password);
    if (user && passwordMatches) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  };

  public verifyUser = async (signUpToken: string) => {
    const user = await this.usersService.findOne({ signUpToken });
    if (!user) {
      throw formatErrors(ApiErrors.NOT_FOUND, 'User not found.');
    }
    if (new Date(user.tokenExpires as string) < new Date()) {
      throw formatErrors(
        ApiErrors.TOKEN_EXPIRED,
        'Verification token expired.',
      );
    }
    user.status = true;
    this.usersService.update(user._id, user);
    return this.login(user);
  };

  public login = async (user: UserInterface) => ({
    access_token: this.jwtService.sign({ ...user }),
  });

  public signUp = async (user: UserCreateDto): Promise<UserInterface> =>
    await this.usersService.create(user);

  public sendOtp = async (phoneNumber: string, otp: OtpInterface) => {
    const otpInstance = new this.otpModel(otp);
    const newOtp = await otpInstance.save();
    return await this.smsService.sendMessage(phoneNumber, newOtp.otp);
  };
}
