import { HttpException, HttpStatus } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { UserCreateDto, UserSignUpDto } from 'src/dtos/user.dto';
import { TokenParams } from 'src/interfaces/shared.interface';
import { ApiErrors } from './enums';

export const isValidEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const addMinutesToDate = (date, minutes) =>
  new Date(date.getTime() + minutes * 60000);

export const formatErrors = (
  errorType: ApiErrors,
  message: string,
): HttpException => {
  const errorCodes = {
    [ApiErrors.NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ApiErrors.TOKEN_EXPIRED]: HttpStatus.NOT_ACCEPTABLE,
    [ApiErrors.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  };
  return new HttpException(
    JSON.stringify({ [errorType]: message }),
    errorCodes[errorType],
  );
};

export const generateRandomToken = (
  { loginId }: UserCreateDto | UserSignUpDto,
  { alphabets = true, upperCase = false, specialChars = false }: TokenParams,
): string => {
  const isEmail = isValidEmail(loginId);
  return otpGenerator.generate(isEmail ? 8 : 6, {
    alphabets,
    upperCase,
    specialChars,
  });
};
