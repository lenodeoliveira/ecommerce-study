import { Get, Injectable } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class AppService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck(): Promise<{
    status: string;
    error: unknown;
    dataBaseStatus: string;
  }> {
    const res: HealthCheckResult = await this.health.check([
      () => this.db.pingCheck('database'),
    ]);
    console.log(res);
    return {
      status: res?.status,
      dataBaseStatus: res?.info?.database?.status,
      error: res?.error ?? null,
    };
  }
}