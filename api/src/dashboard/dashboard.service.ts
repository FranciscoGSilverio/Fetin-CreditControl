import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from 'src/clients/entities/client.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async getDashboardData() {
    let telemetry = {
      totalClientsInDebt: 0,
      purchasesCreatedThisMonth: 0,
      purchasesPaidThisMonth: 0,
      totalPastDues: 0,
      pendingPurchases: [],
    };

    const totalClientsInDebt = await this.clientRepository.countBy({
      isPaymentPending: true,
    });

    const totalPastDues = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.isPending = :isPending', { isPending: true })
      .andWhere('purchase.dueDate < :today', { today: new Date() })
      .getCount();

    const pendingPurchases = await this.purchaseRepository.findBy({
      isPending: true,
    });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);

    const purchasesCreatedThisMonth = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getCount();

    //TODO: purchasesPaidThisMonth

    return {
      ...telemetry,
      totalClientsInDebt,
      purchasesCreatedThisMonth,
      totalPastDues,
      pendingPurchases,
    };
  }
}
