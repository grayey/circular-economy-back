import { HttpException, HttpStatus } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { UserCreateDto, UserSignUpDto } from 'src/dtos/user.dto';
import { TokenParams } from 'src/interfaces/shared.interface';
import { TasksInterface } from 'src/interfaces/tasks.interface';
import application from 'src/main';
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

export const getApplicationRoutes = async () => {
  const app = await application;
  if (app) {
    const router = app.getHttpServer()._events.request._router;
    return router.stack
      .filter((layer) => layer.route)
      .map(({ route }) => ({
        path: route?.path,
        method: route?.stack[0].method,
      }))
      .filter(Boolean);
  }

  return [];
};

export const formatApplicationTasks = (
  tasks: Array<TasksInterface>,
): Array<TasksInterface> => {
  const publicOrExcluded = [
    // this is app is mainly B2C, so not much admin-protected endpoints. So add products, reviews, bids, chat, here
    '/api/swagger-ui-init.js',
    '/api/api/swagger-ui-init.js',
    '/api',
    '/api/',
    '/api-json',
    '/api-yaml',
    '/api/app',
    '/api/auth/login',
    '/api/auth/verify-user',
    '/api/auth/signup',
  ];

  enum appModules {
    AUTH = 'auth',
    USER = 'user',
    AGGREGATOR = 'aggregator',
    APP = 'app',
    BID = 'bid',
    CATEGORY = 'category',
    CHAT = 'chat',
    NOTIFICATION = 'notification',
    PRODUCT = 'product',
    REVIEW = 'review',
    ROLE = 'role',
    TASK = 'task',
  }

  enum methods {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
  }

  return tasks
    .filter(({ path }) => !publicOrExcluded.includes(path))
    .map((task) => {
      const modules = Object.values(appModules);
      modules.forEach((module) => {
        if (task.path.includes(`api/${module}`)) {
          task.moduleName = module;
          task.identifier = `${task.path?.replace(/[/]/g, '-')}-${task.method}`;
          switch (task.method) {
            case methods.GET:
              task.scope = task.path.includes(':id') ? `read:${module}:detail` : `read:${module}`;
              break;
            case methods.POST:
              task.scope = task.path.includes(':id')
                ? `update:${module}`
                : `create:${module}`;
              break;
            case methods.PATCH:
              task.scope = `update:${module}`;
              break;
            case methods.PUT:
              task.scope = `update:${module}`;
              break;
            case methods.DELETE:
              task.scope = `delete:${module}`;
              break;
          }
        }
      });
      return task;
    });
};
