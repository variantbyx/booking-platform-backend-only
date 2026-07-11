import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    let message = exceptionResponse.message || exception.message;
    let errors = null;

    if (Array.isArray(exceptionResponse.message)) {
      message = 'Validation failed';
      errors = exceptionResponse.message;
    }

    const errorResponseBody: any = {
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      errorResponseBody.errors = errors;
    }

    response.status(status).json(errorResponseBody);
  }
}
