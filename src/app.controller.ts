import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async healthCheck(): Promise<{
    status: string;
    error: unknown;
    dataBaseStatus: string;
  }> {
    const res = await this.appService.healthCheck();
    return {
      status: res.status,
      dataBaseStatus: res?.dataBaseStatus,
      error: res.error ?? null,
    };
  }
}