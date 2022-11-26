import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { UserInterface } from 'src/interfaces/user.interface';
import {
  addMinutesToDate,
  generateRandomToken,
  isValidEmail,
} from 'src/utils/helpers';
import * as otpGenerator from 'otp-generator';
import { UserCreateDto, UserSignUpDto, UserVerfiyDto } from 'src/dtos/user.dto';
import environment from 'src/environments';
import { OtpInterface } from 'src/interfaces/otp.interface';
import { GlobalNotificationService } from 'src/services/global-notification.service';
import { TokenParams } from 'src/interfaces/shared.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly globalNotficationService: GlobalNotificationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('verify-user')
  async verifyUser(@Body() { signUpToken }: UserVerfiyDto) {
    return await this.authService.verifyUser(signUpToken);
  }

  @Post('signup')
  async signUp(@Body() user: UserSignUpDto): Promise<UserInterface> {
    const { loginId } = user;
    const isEmail = isValidEmail(loginId);
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

    const data = await this.authService.signUp({
      ...user,
      signUpToken,
      tokenExpires: expiresBy,
    });

    isEmail
      ? this.sendActivationLink(data as UserSignUpDto, token)
      : this.sendOtp(loginId, token);
    return data;
  }

  private sendOtp = async (phoneNumber: string, otp: OtpInterface) => {
    try {
      await this.globalNotficationService.sendOtp(phoneNumber, otp);
    } catch (e) {
      //logger
    }
  };

  private sendActivationLink = async (
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
}
