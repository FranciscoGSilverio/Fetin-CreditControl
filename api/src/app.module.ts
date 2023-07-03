import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { PurchaseModule } from './purchase/purchase.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from './ormconfig';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [ClientsModule, PurchaseModule, TypeOrmModule.forRoot(config), DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
