import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import SmsService from './sms.service';
import { MailService } from './mail.service';
import { Schemata } from 'src/schemas';
import { OtpInterface } from 'src/interfaces/otp.interface';
import { UserInterface } from 'src/interfaces/user.interface';
import { UserCreateDto, UserSignUpDto } from 'src/dtos/user.dto';
import { async } from 'rxjs';

@Injectable()
export class GlobalNotificationService {
  constructor(
    private readonly smsService: SmsService,
    private readonly mailService: MailService,
    @InjectModel(Schemata.OTP.name)
    private otpModel: Model<OtpInterface>,
  ) {}

  /** SMS NOTIFICATIONS */

  /**
   * Sends OTP
   * @param phoneNumber
   * @param otp
   * @returns
   */
  public sendOtp = async (phoneNumber: string, { otp }: OtpInterface) =>
    await this.smsService.sendMessage(phoneNumber, otp);

  // TODO: create sendSignUpSms like sendNewUserCreationSms

  /**
   * sends new admin-created user an sms
   * @param user
   * @param phoneNumber
   */
  public sendNewUserCreationSms = async (
    { firstName, loginId, password }: UserCreateDto,
    clientUrl: string,
  ) => {
    const userName = firstName || loginId;
    const message = `Hello ${userName}. 
    You have been added as a user on the Dotisense platform. \n
    Login ID: ${loginId} \n Password: ${password} \n
    Please visit ${clientUrl} to begin`;
    this.smsService.sendMessage(loginId, message);
  };

  /** EMAIL NOTIFICATIONS */

  /**
   * Sends sign up email
   * @param user
   * @param clientUrl
   * @returns
   */
  public sendSignUpEmail = async (user: UserSignUpDto, clientUrl: string) =>
    this.mailService.sendSignUpEmail(user, clientUrl);

  /**
   * sends new admin-created user an email
   * @param user
   * @param clientUrl
   * @returns
   */
  public sendNewUserCreationEmail = async (
    user: UserCreateDto,
    clientUrl: string,
  ) => this.mailService.sendNewUserCreationEmail(user, clientUrl);

  /** APP NOTIFICATIONS */
}
