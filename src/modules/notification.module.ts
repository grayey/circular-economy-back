import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from 'src/controllers/notification.controller';
import { MailModule } from 'src/modules/mail.module';
import { SmsModule } from 'src/modules/sms.module';
import { Schemata } from 'src/schemas';
import { GlobalNotificationService } from 'src/services/global-notification.service';

@Module({
  imports: [
    MailModule,
    SmsModule,
    MongooseModule.forFeature([Schemata.Notification, Schemata.OTP]),
  ],
  controllers: [NotificationController],
  providers: [GlobalNotificationService],
  exports: [GlobalNotificationService],
})
export class NotificationModule {}
