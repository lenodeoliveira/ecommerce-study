import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import useFactory from './shared/infra/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { CustomersModule } from './modules/customers/customer.module';
import { OrdersModule } from './modules/orders/orders.module';
// eslint-disable-next-line
const appPk = require('../package.json');

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(useFactory),
    CustomersModule,
    OrdersModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
