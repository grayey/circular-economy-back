import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import environment from 'src/environments';
import { MailService } from 'src/services/mail.service';

const { host, user, pass, defaultFrom } = environment.mailConfig;

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host,
        secure: false,
        auth: {
          user,
          pass,
        },
      },
      defaults: {
        from: defaultFrom,
      },
      template: {
        dir: join(__dirname, '..', './markup/mail'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}