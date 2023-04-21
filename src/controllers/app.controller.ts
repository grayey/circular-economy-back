import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';
import { responseOk } from 'src/utils/formatters';
import { AppService } from 'src/services/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<ApiSuccessResponse> {
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
