import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserSignUpDto } from 'src/dtos/user.dto';
import { emailTemplates } from 'src/utils/constants';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  public sendSignUpEmail(user: UserSignUpDto, clientUrl: string) {

    this.mailerService.sendMail({
      to: user.loginId,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Dotisense! Confirm your Email',
      template: emailTemplates.SIGN_UP, // `.hbs` extension is appended automatically
      context: {
        email: user.loginId,
        clientUrl,
      },
    });
  }

  public sendNewUserCreationEmail(user: UserCreateDto, clientUrl: string) {

    this.mailerService.sendMail({
      to: user.loginId,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Dotisense! Login Credentials',
      template: emailTemplates.NEW_USER_CREATION,
      context: {
        email: user.loginId,
        userName: `${user.firstName || user.loginId}`,
        password: user.password,
        clientUrl,
      },
    });
  }
}
