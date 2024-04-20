import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Connection } from 'typeorm';
  
  @Injectable()
  export class TypeOrmInterceptor implements NestInterceptor {
    constructor(private readonly connection: Connection) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        tap(() => {
          // Fecha a conexão após a conclusão da solicitação
          this.connection.close();
        }),
      );
    }
  }