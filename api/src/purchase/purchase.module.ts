import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Purchase } from './entities/purchase.entity';
import { Client } from './../clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';
import { CronTaskService } from 'src/cron-task/cron-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase]), TypeOrmModule.forFeature([Client])],
  controllers: [PurchaseController],
  providers: [PurchaseService, ClientsService, CronTaskService],
})
export class PurchaseModule {}
