
import { Module } from '@nestjs/common';
import AxiosService from 'src/services/axios.service';
import { MailService } from 'src/services/mail.service';
import SmsService from 'src/services/sms.service';


@Module({
  imports: [

  ],
  providers: [SmsService, AxiosService],
  exports: [SmsService], // 👈 export for DI
})
export class SmsModule {}