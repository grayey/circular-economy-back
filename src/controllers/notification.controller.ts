import { Controller, Get } from '@nestjs/common';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';
import { responseOk } from 'src/utils/formatters';
import { GlobalNotificationService } from 'src/services/global-notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly globalNotifcationService: GlobalNotificationService) {}

  @Get('/')
  async getAll(): Promise<ApiSuccessResponse> {
    const data = await [
      {
        id: '1234qwerty',
        userName: 'Emeka Ehirim',
        email: 'ehirim.emeka.e@gmail.com',
        phoneNumber: '07065018170',
      },
    ];

    return responseOk(data);
  }
}
