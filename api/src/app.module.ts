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
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    ClientsModule,
    PurchaseModule,
    CronTaskModule,
    DashboardModule,
    WhatsappMessageModule,
    FirebaseModule
  ],
  
})
export class AppModule {}
