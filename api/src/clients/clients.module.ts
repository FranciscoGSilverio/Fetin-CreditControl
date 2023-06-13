import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Purchase]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
