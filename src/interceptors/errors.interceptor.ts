import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(this.getError(err));
      }),
    );
  }

  private getError = (err: any) => {
    const { status, message, ...rest } = err;
    return {
      statusCode: status,
      message,
      ...rest,
    };
  };
}
