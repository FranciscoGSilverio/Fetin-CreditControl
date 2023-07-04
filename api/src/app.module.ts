import { Module } from '@nestjs/common';

import { ClientsModule } from './clients/clients.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from './ormconfig';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ClientsModule,
    PurchaseModule,
    TypeOrmModule.forRoot(config),
    DashboardModule,
  ],
})
export class AppModule {}
