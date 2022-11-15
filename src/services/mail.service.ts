import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/interfaces/user.interface';
import { emailTemplates } from 'src/utils/constants';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    public async sendSignUpEmail(user: UserInterface, clientUrl: string) {
    console.log('SENDING SIGNUP mail')
      await this.mailerService.sendMail({
        to: user.loginId,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to LexChange App! Confirm your Email',
        template: emailTemplates.SIGN_UP, // `.hbs` extension is appended automatically
        context: {
          email: user.loginId,
        clientUrl,
        },
      });
    }
}
