import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from './ormconfig';
import { DashboardModule } from './dashboard/dashboard.module';
import { CronTaskModule } from './cron-task/cron-task.module';

import { ScheduleModule } from '@nestjs/schedule';
import { WhatsappMessageModule } from './whatsapp-message/whatsapp-message.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule,
    PurchaseModule,
    CronTaskModule,
    DashboardModule,
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    WhatsappMessageModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
