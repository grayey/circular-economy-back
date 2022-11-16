import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { responseOk } from 'src/utils/formatters';
import { addMinutesToDate, isValidEmail } from 'src/utils/helpers';
import { MailService } from 'src/services/mail.service';
import * as otpGenerator from 'otp-generator';
import { UserCreateDto, UserVerfiyDto } from 'src/dtos/user.dto';
import environment from 'src/environments';
import { OtpInterface } from 'src/interfaces/otp.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * This method verifies a user using activation code
   */
  @Post('verify-user')
  async verifyUser(@Body() { signUpToken }: UserVerfiyDto) {
    return await this.authService.verifyUser(signUpToken);
  }

  @Post('/signup')
  async signUp(@Body() user: UserCreateDto): Promise<UserInterface> {
    const { loginId } = user;
    const isEmail = isValidEmail(loginId);
    const signUpToken = otpGenerator.generate(isEmail ? 16 : 6, {
      alphabets: isEmail,
      upperCase: false,
      specialChars: false,
    });
    const now = new Date();
    const expiresBy = addMinutesToDate(now, 10).toISOString();
    const token: OtpInterface = {
      otp: signUpToken,
      expiresBy,
      verified: true,
    };

    const data: UserInterface = await this.authService.signUp({
      ...user,
      signUpToken,
      tokenExpires: expiresBy,
    });

    isEmail
      ? this.sendActivationLink(data, token)
      : this.sendOtp(loginId, token);
    return data;
  }

  private async sendOtp(phoneNumber: string, otp: OtpInterface) {
    try {
      await this.authService.sendOtp(phoneNumber, otp);
    } catch (e) {}
  }

  private async sendActivationLink(
    user: UserInterface,
    { otp: token }: OtpInterface,
  ) {
    try {
      this.mailService.sendSignUpEmail(
        user,
        `${environment.clientUrl}/verify-email?activate=${token}`,
      );
    } catch (e) {}
  }
}
