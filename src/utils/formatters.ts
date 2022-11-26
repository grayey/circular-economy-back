import { HttpStatus } from '@nestjs/common';
import { ApiSuccessResponse } from 'src/interfaces/api.interface';

export const responseOk = (
  data: any,
  message?: string,
  statusCode?: number,
): ApiSuccessResponse => {
  message = message || 'Successful';
  statusCode = statusCode || HttpStatus.OK;
  return {
    data,
    status: {
      message,
      statusCode,
    },
  };
};

export const copyToJson = (data: any) => JSON.parse(JSON.stringify(data));
